import pickle
import io
import os
from google.cloud import speech_v1p1beta1 as speech
from pydub import AudioSegment
import numpy as np
import librosa
from fastapi import FastAPI, File, UploadFile, Request
import errno
import shutil
app = FastAPI()
from starlette.middleware.cors import CORSMiddleware

origins = ["http://localhost:4200"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/prediction/{person_id}")
async def prediction_audio(person_id,audio_file: UploadFile = File(...)):
    try:
        # Save the uploaded audio file to a temporary location
        temp_file_path = os.path.join("D:/pythonProject/", audio_file.filename)
        with open(temp_file_path, "wb") as f:
            f.write(audio_file.file.read())
        filename = './new_pertions/person_split_wav/'+person_id+'/'+person_id + '.sav'
        loaded_model = pickle.load(open(filename, 'rb'))

        # sound_wav = './danna_test.wav'

        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'project-medichain-391006-693f096233a5.json'

        key_words = ['hello','today','doctor','good','morning','afternoon', 'night']
        i=1
        client = speech.SpeechClient()


        with io.open(temp_file_path, "rb") as audio_file:
            content = audio_file.read()

        audio = speech.RecognitionAudio(content=content)

        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=24000,
            language_code="en-US",
            enable_speaker_diarization=True,
            diarization_speaker_count=2,
        )

        print("Waiting for operation to complete...")
        response = client.recognize(config=config, audio=audio)

        result = response.results[-1]
        words_info = result.alternatives[0].words
        # Printing out the output:
        words_list = []
        audio = AudioSegment.from_wav(temp_file_path)

        output_person_list =[]
        for word_info in words_info:
            start_time = int(((word_info.start_time.seconds)*1000000 + word_info.start_time.microseconds)/1000)
            end_time = int(((word_info.end_time.seconds)*1000000 + word_info.end_time.microseconds)/1000)
            print('word :',word_info.word)
            print(start_time)
            print(end_time)

            split_audio = audio[start_time:end_time]
            split_audio

            for key_word in key_words:
                if (key_word == word_info.word):
                    output_directory = "temp_folder/" + str(key_word)
                    output_file = os.path.join(output_directory, f"{i}.wav")
                    split_audio.export(output_file, format="wav")

        classes = 'afternoon doctor good hello morning night today'.split()
        for output_class in classes:
            for filename in os.listdir(f'temp_folder/{output_class}'):
                sample = f'temp_folder/{output_class}/{filename}'
                y, sr = librosa.load(sample, mono=True, duration=30)
                chroma_stft = librosa.feature.chroma_stft(y=y, sr=sr)
                rmse = librosa.feature.rms(y=y)
                spec_cent = librosa.feature.spectral_centroid(y=y, sr=sr)
                spec_bw = librosa.feature.spectral_bandwidth(y=y, sr=sr)
                rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
                zcr = librosa.feature.zero_crossing_rate(y)
                mfcc = librosa.feature.mfcc(y=y, sr=sr)
                to_append = f'{np.mean(chroma_stft)} {np.mean(rmse)} {np.mean(spec_cent)} {np.mean(spec_bw)} {np.mean(rolloff)} {np.mean(zcr)}'
                for e in mfcc:
                    to_append += f' {np.mean(e)}'
                input_value = to_append.split()
                input_value = np.array(input_value).reshape(-1, 26)
                output = loaded_model.predict(input_value)
                print(output)
                predictions = loaded_model.predict_proba(input_value)
                print(predictions)

                print('\n')

                print("Output is",output[0])

                if(output[0] == 11):
                    print("===============================  This is Right person  =================================")
                    return {f'command': f'{1}'}
                else:
                    print("...............................  This is Not Right person  .................................")
                    return {f'command': f'{0}'}

    except OSError as err:
        return ("Error: % s" % err)