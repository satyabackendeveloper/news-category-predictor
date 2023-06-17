import os
import sys
os.system('pip3 install numpy')
os.system('pip3 install pandas')
os.system('pip3 install tensorflow')
os.system('pip3 install scikit-learn')
os.system('pip3 install seaborn')
os.system('pip3 install matplotlib')

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split

import tensorflow as tf

from sklearn.metrics import confusion_matrix, classification_report


data = pd.read_json('data.json', orient='records')

categories = ['CRIME', 'ENTERTAINMENT', 'WORLD NEWS', 'IMPACT', 'POLICTICS', 'WEIRD NEWS', 'BLACK VOICES', 'WOMEN', 'COMEDY', 'QUEER VOICES', 'SPORTS', 'BUSINESS', 'TRAVEL', 'MEDIA', 'TECH', 'RELIGION', 'SCIENCE', 'LATINO VOICES', 'EDUCATION', 'COLLEGE', 'PARENTS', 'ARTS & CULTURE', 'STYLE', 'GREEN', 'TASTE', 'HEALTHY LIVING', 'THE WORLDPOST', 'GOOD NEWS', 'WORLDPOST', 'FIFTY', 'ARTS', 'WELLNESS', 'PARENTING', 'HOME & LIVING', 'STYLE & BEAUTY', 'DIVORCE', 'WEDDINGS', 'FOOD & DRINK', 'MONEY', 'ENVIRONMENT', 'CULTURE & ARTS']

mapping = dict(enumerate(categories))
LABEL_MAPPING = { value: key for key, value in mapping.items()}
NUM_CLASSES = len(LABEL_MAPPING)


def get_sequences(texts, tokenizer, train=True, max_seq_length=0):
    sequences = tokenizer.texts_to_sequences(texts)

    if train == True:
        max_seq_length = np.max(list(map(lambda x: len(x), sequences)))


    sequences = pad_sequences(sequences, maxlen=max_seq_length, padding='post')
    return sequences


# Preprocess inputs
def preprocess_inputs(df, label_mapping=None):
    df = df.copy()
    df = df.loc[:, ['heading', 'category']]

    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(df['heading'], df['category'], train_size=0.9, shuffle=False)
    #fit a tokenizer
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(X_train)

    X_train = get_sequences(X_train, tokenizer, train=True)
    X_test= get_sequences(X_test, tokenizer, train=False, max_seq_length=X_train.shape[1])
    print(X_train.shape)
    print(X_test.shape)
    print(y_train)
    return X_train, X_test, y_train, y_test

def trainModel(X_train):
    inputs = tf.keras.Input(shape=(X_train.shape[1], ))
    
    embedding = tf.keras.layers.Embedding(input_dim=10000, output_dim=64)(inputs)

    flatten = tf.keras.layers.Flatten()(embedding)

    dense_1 = tf.keras.layers.Dense(128, activation='relu')(flatten)
    dense_2 = tf.keras.layers.Dense(128, activation='relu')(dense_1)

    outputs = tf.keras.layers.Dense(NUM_CLASSES, activation='softmax')(dense_2)
    model = tf.keras.Model(inputs, outputs)
    return model


def predictCategory():
    X_train, X_test, y_train, y_test  = preprocess_inputs(data, label_mapping=LABEL_MAPPING)
    model = trainModel(X_train)

    model.compile( optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    history = model.fit(
        X_train,
        y_train,
        validation_split=0.2,
        batch_size=32,
        epochs=100,
        callbacks=[
            tf.keras.callbacks.EarlyStopping(
                monitor='val_loss',
                patience=3,
                restore_best_weights=True
            )
        ]
    )
    print("Test Accuracy: {:.2f}%".format(model.evaluate(X_test, y_test, verbose=0)[1]*100))
    y_pred = np.argmax(model.predict(X_test), axis=1)
    print(y_pred)
    cm = confusion_matrix(y_test, y_pred)
    # clr = classification_report(y_test, y_pred, target_names=list(LABEL_MAPPING.keys()))
    plt.figure(figsize=(20,30))
    sns.heatmap(cm, annot=True, vmin=0, fmt='g', cmap='Blues', cbar=False)
    plt.xticks(ticks=np.arange(NUM_CLASSES) + 0.5, labels=list(LABEL_MAPPING.keys()), rotation=90)    
    plt.yticks(ticks=np.arange(NUM_CLASSES) + 0.5, labels=list(LABEL_MAPPING.keys()), rotation=0)    
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('Confusion Matrix')
    plt.show()


predictCategory()