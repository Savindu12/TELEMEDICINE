import io
from google.cloud import speech_v1p1beta1 as speech
from pydub import AudioSegment
import csv
import os
import numpy as np
import librosa
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import shutil
import errno
from sklearn.model_selection import train_test_split
import pickle
from fastapi import FastAPI, File, UploadFile, Request
import wave
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

credential_path = "D:/pythonProject/project-medichain-391006-693f096233a5.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
key_words = ['hello','today','doctor','good','morning','afternoon', 'night']
i=1

client = speech.SpeechClient()

folder_path = "D:/pythonProject/person/test"
origins = ["http://localhost:4200"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def count_files_in_folder(folder_path):
    file_count = 0
    for _, _, files in os.walk(folder_path):
        file_count += len(files)
    return file_count

# num_files = count_files_in_folder(folder_path)
# print("Number of files in the folder:", num_files)

def add_pertion_dataset():
    pass

def spit_sound_wav(num_files,folder_path,foulder_num,peason_id):
    folder_path = folder_path
    for i in range(int(num_files)+1):
        speech_file = folder_path + '/' + str(i+1) + '.wav'
        with io.open(speech_file, "rb") as audio_file:
            content = audio_file.read()

        audio = speech.RecognitionAudio(content=content)

        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=24000,
            language_code="en-US",
            enable_speaker_diarization=True,
            diarization_speaker_count=2,
        )


        response = client.recognize(config=config, audio=audio)

        result = response.results[-1]
        words_info = result.alternatives[0].words
        audio = AudioSegment.from_wav(speech_file)


        src_split = 'D:/pythonProject/new_pertions/split_folder'
        dest_split = 'D:/pythonProject/new_pertions/person_split_wav/' + str(foulder_num) +'/split_wav/'
        csv_location = 'D:/pythonProject/new_pertions/person_split_wav/' + str(foulder_num)+'/'

        try:
            shutil.copytree(src_split, dest_split)
        except OSError as err:
            if err.errno == errno.ENOTDIR:
                shutil.copy2(src_split, dest_split)
            else:
                print("Error: % s" % err)


        for word_info in words_info:
            start_time = int(((word_info.start_time.seconds)*1000000 + word_info.start_time.microseconds)/1000)
            end_time = int(((word_info.end_time.seconds)*1000000 + word_info.end_time.microseconds)/1000)


            split_audio = audio[start_time:end_time]

            for key_word in key_words:
                if (key_word == word_info.word):
                    output_directory = dest_split + str(key_word)
                    output_file = os.path.join(output_directory, f"{i+1}.wav")
                    split_audio.export(output_file, format="wav")

    create_csv(csv_location, foulder_num, peason_id)


def create_csv(csv_location, foulder_num, peason_id):
    header = 'filename choma_stft rmse spectral_centroid spectral_bandwidth rolloff zero_crossing_rate'
    for i in range(1,21):
        header += f' mfcc{i}'
    header += ' label person'
    header = header.split()



    file = open(csv_location + '/new_pertion.csv','w', newline='')
    with file:
        writer = csv.writer(file)
        writer.writerow(header)
    classes = 'afternoon doctor good hello morning night today'.split()

    for input_class in classes:
        for filename in os.listdir(csv_location+f'split_wav/{input_class}'):
            person, extension = os.path.splitext(filename)
            sample = csv_location+f'split_wav/{input_class}/{filename}'
            y, sr = librosa.load(sample, mono=True, duration=30)
            chroma_stft = librosa.feature.chroma_stft(y=y, sr=sr)
            rmse = librosa.feature.rms(y=y)
            spec_cent = librosa.feature.spectral_centroid(y=y, sr=sr)
            spec_bw = librosa.feature.spectral_bandwidth(y=y, sr=sr)
            rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
            zcr = librosa.feature.zero_crossing_rate(y)
            mfcc = librosa.feature.mfcc(y=y, sr=sr)
            to_append = f'{filename} {np.mean(chroma_stft)} {np.mean(rmse)} {np.mean(spec_cent)} {np.mean(spec_bw)} {np.mean(rolloff)} {np.mean(zcr)}'
            for e in mfcc:
                to_append += f' {np.mean(e)}'
            to_append += f' {input_class} {person}'
            file = open(csv_location + '/new_pertion.csv','a', newline='')
            with file:
                writer =csv.writer(file)
                writer.writerow(to_append.split())


    csv_file_path = csv_location + '/new_pertion.csv'

    create_model(csv_file_path,csv_location, foulder_num, peason_id)

def create_model(csv_file_path, pkl_location, foulder_num, peason_id):
    print(foulder_num)
    train_data = pd.read_csv(csv_file_path)
    X = train_data.drop(['filename','label','person'], axis=1)
    Y = train_data['person']

    X_train,X_test,y_train,y_test = train_test_split(X, Y)


    # param_dist = {'n_estimators': randint(50, 500),
    #               'max_depth': randint(1, 20)}

    model = RandomForestClassifier()

    # rand_search = RandomizedSearchCV(rf, param_distributions=param_dist)

    model.fit(X_train.values, y_train)

    # best_rf = rand_search.best_estimator_
    #
    # print('Best hyperparameters:', rand_search.best_params_)

    filename = pkl_location + peason_id + '.sav'
    pickle.dump(model, open(filename, 'wb'))

    old_folder_name = "D:/pythonProject/new_pertions/person_split_wav/"+str(foulder_num)
    new_folder_name ="D:/pythonProject/new_pertions/person_split_wav/"+str(peason_id)
    os.rename(old_folder_name,new_folder_name)


@app.post("/process_wav/{peason_id}")
async def register_new_persion(peason_id, audio_file: UploadFile = File(...)):
    try:
        dir_path = r'D:/pythonProject/new_pertions/new_pertion'
        # temp_file_path = os.path.join(dir_path,audio_file.filename)
        # with open(temp_file_path, "wb") as f:
        #     f.write(audio_file.file.read())

        # new_file_name = peason_id+".wav"  # Replace this with the desired new name
        # new_file_path = os.path.join(dir_path, new_file_name)
        # os.rename(temp_file_path, new_file_path)

        # # Load the audio data from the temporary file
        # person_voice = AudioSegment.from_file(temp_file_path)
        #
        # # Perform audio processing (e.g., increase volume by 3dB)
        #
        # split_audio = wave.open(temp_file_path, 'rb')

        folders_new = 1
        files = 0
        for pre, dir, file in os.walk(dir_path):
            folders_new += len(dir)
            files += len(file)

        src = 'D:/pythonProject/new_pertions/pase'
        dest = 'D:/pythonProject/new_pertions/new_pertion/' + peason_id

        try:
            shutil.copytree(src, dest)
        except OSError as err:
            if err.errno == errno.ENOTDIR:
                shutil.copy2(src, dest)
            else:
                print("Error: % s" % err)

        # save new recode in folder
        dir_path = 'D:/pythonProject/new_pertions/new_pertion/' + peason_id +'/'
        wav_files = 0
        for _, _, filenames in os.walk(dir_path):
            wav_files += len(filenames)


        pertion_sound = 'D:/pythonProject/new_pertions/new_pertion/'+peason_id+'/'
        temp_file_path = os.path.join(pertion_sound, audio_file.filename)
        with open(temp_file_path, "wb") as f:
            f.write(audio_file.file.read())
        new_file_name = "11.wav"  # Replace this with the desired new name
        new_file_path = os.path.join(dir_path, new_file_name)
        os.rename(temp_file_path, new_file_path)

    except OSError as err:
        if err.errno == errno.ENOTDIR:
            shutil.copy2(src, dest)
        else:
            print("Error: % s" % err)

    foulder_num =folders_new
    spit_sound_wav(wav_files, dir_path, foulder_num,peason_id)


# person_voice = './amado.wav'
# register_new_persion(person_voice)

# my_training_sound =''
# register_new_persion(my_training_sound)
