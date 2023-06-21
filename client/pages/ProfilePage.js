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
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder={name}
      ></input>
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
        <textarea
          rows='5'
          cols='80'
          onChange={(e) => {
            setAbout(e.target.value);
          }}
          placeholder={about}
        ></textarea>
      </div>

      <h2>Basic information</h2>
      <div>
        <ul>
          <li>
            <label>Breed:</label>
            <input
              onChange={(e) => {
                setBreed(e.target.value);
              }}
              placeholder={breed}
            ></input>
          </li>
          <li>
            <label>Sex:</label>
            <label>female</label>
            <input
              type='radio'
              name='sex'
              value='female'
              onChange={(e) => {
                setSex(e.target.value);
              }}
            />
            <label>male</label>
            <input
              type='radio'
              name='sex'
              value='male'
              onChange={(e) => {
                setSex(e.target.value);
              }}
            />
          </li>
          <li>
            <label>Age:</label>
            <input
              type='number'
              min='1'
              max='99'
              onChange={(e) => {
                setAge(e.target.value);
              }}
              placeholder={age}
            ></input>
          </li>
          <li>
            <label>Size:</label>
            <label>small</label>
            <input
              type='radio'
              name='size'
              value='small'
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
            <label>medium</label>
            <input
              type='radio'
              name='size'
              value='medium'
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
            <label>big</label>
            <input
              type='radio'
              name='size'
              value='big'
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </li>
          <li>
            <label>Owner:</label>
            <input
              onChange={(e) => {
                setOwner(e.target.value);
              }}
              placeholder={owner}
            ></input>
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
