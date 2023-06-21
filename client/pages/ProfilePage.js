import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState();
  const [size, setSize] = useState('');
  const [owner, setOwner] = useState('');
  const [about, setAbout] = useState('');

  const [nameEdit, setEditName] = useState(false);
  const [breedEdit, setEditBreed] = useState(false);
  const [sexEdit, setEditSex] = useState(false);
  const [ageEdit, setEditAge] = useState(false);
  const [sizeEdit, setEditSize] = useState(false);
  const [ownerEdit, setEditOwner] = useState(false);
  const [aboutEdit, setEditAbout] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get('/api/dogs/1');
        console.log('profile fetched for 1');
        console.log(response.data);
        setName(response.data.name);
        setBreed(response.data.breed);
        setSex(response.data.sex);
        setAge(response.data.age);
        setSize(response.data.size);
        setOwner(response.data.owner);
        setAbout(response.data.about);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, []);

  return (
    <div id='myForm'>
      <label>Name:</label>
      {name === '' || nameEdit ? (
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          onDoubleClick={(e) => {
            setEditName(false);
          }}
          placeholder={name}
        ></input>
      ) : (
        <label
          onClick={(e) => {
            setEditName(true);
          }}
        >
          {' '}
          {name}
        </label>
      )}

      <div>
        <label>
          Your Image File
          <input
            type='file'
            name='myImage'
            accept='image/png, image/gif, image/jpeg'
          />
        </label>
        <img
          src='https://i.redd.it/lw9juo1qu7v91.jpg'
          height='400px'
          width='400px'
        ></img>
      </div>
      <h2>About me</h2>
      <div width='800px'>
        {about === '' || aboutEdit ? (
          <textarea
            rows='5'
            cols='80'
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            onDoubleClick={(e) => {
              setEditAbout(false);
            }}
            placeholder={about}
          ></textarea>
        ) : (
          <p
            onClick={(e) => {
              setEditAbout(true);
            }}
          >
            {about}
          </p>
        )}
      </div>

      <h2>Basic information</h2>
      <div>
        <ul>
          <li>
            <label>Breed:</label>
            {breed === '' || breedEdit ? (
              <input
                onChange={(e) => {
                  setBreed(e.target.value);
                }}
                placeholder={breed}
                onDoubleClick={(e) => {
                  setEditBreed(false);
                }}
              ></input>
            ) : (
              <label
                onClick={(e) => {
                  setEditBreed(true);
                }}
              >
                {' '}
                {breed}
              </label>
            )}
          </li>
          <li>
            <label>Sex:</label>
            <label>female</label>
            {sex === 'Female' ? (
              <input
                type='radio'
                name='sex'
                value='Female'
                onChange={(e) => {
                  setSex(e.target.value);
                }}
                checked
              />
            ) : (
              <input
                type='radio'
                name='sex'
                value='Female'
                onChange={(e) => {
                  setSex(e.target.value);
                }}
              />
            )}

            <label>male</label>
            {sex === 'Male' ? (
              <input
                type='radio'
                name='sex'
                value='Male'
                onChange={(e) => {
                  setSex(e.target.value);
                }}
                checked
              />
            ) : (
              <input
                type='radio'
                name='sex'
                value='Male'
                onChange={(e) => {
                  setSex(e.target.value);
                }}
              />
            )}
          </li>
          <li>
            <label>Age:</label>
            {age === undefined || ageEdit ? (
              <input
                type='number'
                min='1'
                max='99'
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                onDoubleClick={(e) => {
                  setEditAge(false);
                }}
                placeholder={age}
              ></input>
            ) : (
              <label
                onClick={(e) => {
                  setEditAge(true);
                }}
              >
                {' '}
                {age}
              </label>
            )}
          </li>
          <li>
            <label>Size:</label>
            <label>small</label>
            {size === 'Small' ? (
              <input
                type='radio'
                name='size'
                value='Small'
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                checked
              />
            ) : (
              <input
                type='radio'
                name='size'
                value='Small'
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            )}

            <label>medium</label>
            {size === 'Medium' ? (
              <input
                type='radio'
                name='size'
                value='Medium'
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                checked
              />
            ) : (
              <input
                type='radio'
                name='size'
                value='Medium'
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            )}
            <label>big</label>
            {size === 'Large' ? (
              <input
                type='radio'
                name='size'
                value='Large'
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                checked
              />
            ) : (
              <input
                type='radio'
                name='size'
                value='Large'
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            )}
          </li>
          <li>
            <label>Owner:</label>
            {owner === '' || ownerEdit ? (
              <input
                onChange={(e) => {
                  setOwner(e.target.value);
                }}
                placeholder={owner}
                onDoubleClick={(e) => {
                  setEditOwner(false);
                }}
              ></input>
            ) : (
              <label
                onClick={(e) => {
                  setEditOwner(true);
                }}
              >
                {' '}
                {owner}
              </label>
            )}
          </li>
        </ul>
      </div>
      <button
        type='submit'
        onClick={async (e) => {
          console.log(name, breed, owner, age, sex, size, about);
          await axios.post('/api/dogs/create', {
            name: name,
            breed: breed,
            owner: owner,
            age: Number(age),
            sex: sex,
            size: size,
            about: about,
          });
        }}
      >
        SUBMIT
      </button>
    </div>
  );
}
