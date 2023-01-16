import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {
  Avatar as AvatarChakra,
  Button,
  Input, Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";

import {ChangePassword} from "./ChangePassword";
import {EmailAndSMS} from "./EmailAndSMS";
import { ManageContact } from './ManageContact';
import {HomeNav} from "../Home/HomeNav";
import Avatar from 'react-avatar-edit';
import {SubmitHandler, useForm} from "react-hook-form";
export interface UserInterface {
  city:string,
  country:string,
  dateOfBirth:string | Date,
  firstName:string,
  lastName:string,
  username:string,
  _id:string,
}

export const EditAccount = () => {
  const {userId} = useParams();

  const {user} = useSelector((state: RootState) => state.user);
  const [toggleAvatar, setToggleAvatar] = useState(false)
  const [src, setSrc] = useState(undefined);
  const [preview ,setPreview] = useState(null);
  const onClose = () => {
    setPreview(null)
  }
  const onCrop = (view:any) => setPreview(view)
  const [form, setForm] = useState({
    username :'',
    firstName:'',
    lastName:'',
    city:'',
    country:'',
    dateOfBirth:'',
    _id: '',
    base64Avatar:''
  });
  const {register, handleSubmit}  = useForm<UserInterface>({
    values:form});
  console.log(getFormattedDate(new Date(Date.now())))
  function getFormattedDate(date:Date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
  };
  const saveAvatar = async () => {
      await fetch(`http://localhost:3001/user/${user._id}/avatar`,{
        method:'PUT',
        credentials:'include',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({preview})
      })
      setPreview(null);
      setToggleAvatar(prev => !prev)
  }
  useEffect(() => {
    (async() =>{
      const res = await fetch(`http://localhost:3001/user/${userId}`, {
        credentials:'include',
      })
      const data = await res.json();
      setForm(data);
    })();
  },[]);
  const onSend = (data:any) => {

    (async() => {

      await fetch(`http://localhost:3001/user/${userId}`,{
        method:"PUT",
        credentials:'include',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(data)
      })
      window.location.reload();
    })();

  };
  return (<>
    <HomeNav/>
    <div className='w-[90vw] flex m-auto'>
      <Tabs isFitted variant='enclosed'  pt={20} w={"full"} border='0px' >
        <TabList mb='1em'>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff'}} h='75px'>Personal Information</Tab>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff' }}>Change Password</Tab>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff'}}>Email And SMS</Tab>
          <Tab _selected={{backgroundColor:'#6366f1', color:'#fff'}}>Manage Contact</Tab>
        </TabList>
        <TabPanels >
          <TabPanel p={0}>

            <h1 className='font-bold text-2xl border-b-[1px] pb-5  border-b-[#f1f1f1]'>Personal Information</h1>
            <AvatarChakra size='xl' src={form.base64Avatar}/>
            <button className='outline-none bg-amber-300 px-4 py-2 border-2 border-black ml-20 mt-7 ' onClick={() => setToggleAvatar(prev => !prev)}>Change Avatar</button>

            {toggleAvatar &&  <div className='flex w-full h-[200px]'>   <div className='relative w-[210px]'>
              {toggleAvatar && <Avatar width={150} height={150} src={src} onClose={onClose} onCrop={onCrop} />}
              {preview && <button className='font-bold bg-black text-white text-xl rounded-xl border-[2px] px-5 py-2.5 absolute bottom-12 -right-2 'onClick={saveAvatar}>
                <i className="fa-solid fa-check"></i></button>}
            </div>
              {preview && <div className='w-full h-full flex justify-center items-start ml-20 '><div className='ml-3 font-bold text-xl '>Preview:<img className='' src={preview} alt=""/></div></div>}</div>}
            <form onSubmit={handleSubmit(onSend)}>
            <div className='grid grid-cols-2'>  <div><div className='h-[70px] relative mt-5'><label className=" mb-3 inline-block mr-5">First Name:</label>
              <Input w='42vw'   {...register('firstName')} pos='absolute' left='0' bottom='0' placeholder='John' ></Input></div>

              <div className='h-[70px] relative mt-7'> <label className=" mb-3  inline-block mr-5">Last Name:</label>
                <Input className='inline-block'  w='42vw' pos='absolute' left='0' bottom='0'  placeholder='Smith'  {...register('lastName')} ></Input></div>

              <div className='h-[70px] relative mt-7 '><label className=" mb-3  inline-block mr-5">User Name:</label>
                <Input w='42vw'  pos='absolute' left='0' bottom='0' {...register('username')} ></Input></div></div>




             <div> <div className='h-[70px] relative mt-5'> <label className=" mb-3 inline-block ">City:</label>
               <Input className='inline-block'  w='42vw' pos='absolute' left='0' bottom='0'  placeholder='Atlanta' {...register('city')} ></Input></div>



               <div className='h-[70px] relative mt-7'> <label className=" mb-3 w-[42vw] inline-block mr-5">Date Of Birth:</label> <Input  w='42vw' className='inline-block mr-5' pos='absolute' left='0' bottom='0'  {...register('dateOfBirth')}

                                                           type='date'
                                                           max={new Date().toISOString().slice(0, -14)}
                                                           size="md"

               /></div>
               <div className='h-[70px] relative mt-7'><label className=" mb-3 inline-block mr-20">Country:</label>
                 <Select className='inline-block ' pos='absolute' left='0' bottom='0' w='42vw' id="country" {...register('country')} >
                   <option value="Afghanistan">Afghanistan</option>
                   <option value="Åland Islands">Åland Islands</option>
                   <option value="Albania">Albania</option>
                   <option value="Algeria">Algeria</option>
                   <option value="American Samoa">American Samoa</option>
                   <option value="Andorra">Andorra</option>
                   <option value="Angola">Angola</option>
                   <option value="Anguilla">Anguilla</option>
                   <option value="Antarctica">Antarctica</option>
                   <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                   <option value="Argentina">Argentina</option>
                   <option value="Armenia">Armenia</option>
                   <option value="Aruba">Aruba</option>
                   <option value="Australia">Australia</option>
                   <option value="Austria">Austria</option>
                   <option value="Azerbaijan">Azerbaijan</option>
                   <option value="Bahamas">Bahamas</option>
                   <option value="Bahrain">Bahrain</option>
                   <option value="Bangladesh">Bangladesh</option>
                   <option value="Barbados">Barbados</option>
                   <option value="Belarus">Belarus</option>
                   <option value="Belgium">Belgium</option>
                   <option value="Belize">Belize</option>
                   <option value="Benin">Benin</option>
                   <option value="Bermuda">Bermuda</option>
                   <option value="Bhutan">Bhutan</option>
                   <option value="Bolivia">Bolivia</option>
                   <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                   <option value="Botswana">Botswana</option>
                   <option value="Bouvet Island">Bouvet Island</option>
                   <option value="Brazil">Brazil</option>
                   <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                   <option value="Brunei Darussalam">Brunei Darussalam</option>
                   <option value="Bulgaria">Bulgaria</option>
                   <option value="Burkina Faso">Burkina Faso</option>
                   <option value="Burundi">Burundi</option>
                   <option value="Cambodia">Cambodia</option>
                   <option value="Cameroon">Cameroon</option>
                   <option value="Canada">Canada</option>
                   <option value="Cape Verde">Cape Verde</option>
                   <option value="Cayman Islands">Cayman Islands</option>
                   <option value="Central African Republic">Central African Republic</option>
                   <option value="Chad">Chad</option>
                   <option value="Chile">Chile</option>
                   <option value="China">China</option>
                   <option value="Christmas Island">Christmas Island</option>
                   <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                   <option value="Colombia">Colombia</option>
                   <option value="Comoros">Comoros</option>
                   <option value="Congo">Congo</option>
                   <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                   <option value="Cook Islands">Cook Islands</option>
                   <option value="Costa Rica">Costa Rica</option>
                   <option value="Cote D'ivoire">Cote D'ivoire</option>
                   <option value="Croatia">Croatia</option>
                   <option value="Cuba">Cuba</option>
                   <option value="Cyprus">Cyprus</option>
                   <option value="Czech Republic">Czech Republic</option>
                   <option value="Denmark">Denmark</option>
                   <option value="Djibouti">Djibouti</option>
                   <option value="Dominica">Dominica</option>
                   <option value="Dominican Republic">Dominican Republic</option>
                   <option value="Ecuador">Ecuador</option>
                   <option value="Egypt">Egypt</option>
                   <option value="El Salvador">El Salvador</option>
                   <option value="Equatorial Guinea">Equatorial Guinea</option>
                   <option value="Eritrea">Eritrea</option>
                   <option value="Estonia">Estonia</option>
                   <option value="Ethiopia">Ethiopia</option>
                   <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                   <option value="Faroe Islands">Faroe Islands</option>
                   <option value="Fiji">Fiji</option>
                   <option value="Finland">Finland</option>
                   <option value="France">France</option>
                   <option value="French Guiana">French Guiana</option>
                   <option value="French Polynesia">French Polynesia</option>
                   <option value="French Southern Territories">French Southern Territories</option>
                   <option value="Gabon">Gabon</option>
                   <option value="Gambia">Gambia</option>
                   <option value="Georgia">Georgia</option>
                   <option value="Germany">Germany</option>
                   <option value="Ghana">Ghana</option>
                   <option value="Gibraltar">Gibraltar</option>
                   <option value="Greece">Greece</option>
                   <option value="Greenland">Greenland</option>
                   <option value="Grenada">Grenada</option>
                   <option value="Guadeloupe">Guadeloupe</option>
                   <option value="Guam">Guam</option>
                   <option value="Guatemala">Guatemala</option>
                   <option value="Guernsey">Guernsey</option>
                   <option value="Guinea">Guinea</option>
                   <option value="Guinea-bissau">Guinea-bissau</option>
                   <option value="Guyana">Guyana</option>
                   <option value="Haiti">Haiti</option>
                   <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                   <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                   <option value="Honduras">Honduras</option>
                   <option value="Hong Kong">Hong Kong</option>
                   <option value="Hungary">Hungary</option>
                   <option value="Iceland">Iceland</option>
                   <option value="India">India</option>
                   <option value="Indonesia">Indonesia</option>
                   <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                   <option value="Iraq">Iraq</option>
                   <option value="Ireland">Ireland</option>
                   <option value="Isle of Man">Isle of Man</option>
                   <option value="Israel">Israel</option>
                   <option value="Italy">Italy</option>
                   <option value="Jamaica">Jamaica</option>
                   <option value="Japan">Japan</option>
                   <option value="Jersey">Jersey</option>
                   <option value="Jordan">Jordan</option>
                   <option value="Kazakhstan">Kazakhstan</option>
                   <option value="Kenya">Kenya</option>
                   <option value="Kiribati">Kiribati</option>
                   <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of
                   </option>
                   <option value="Korea, Republic of">Korea, Republic of</option>
                   <option value="Kuwait">Kuwait</option>
                   <option value="Kyrgyzstan">Kyrgyzstan</option>
                   <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                   <option value="Latvia">Latvia</option>
                   <option value="Lebanon">Lebanon</option>
                   <option value="Lesotho">Lesotho</option>
                   <option value="Liberia">Liberia</option>
                   <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                   <option value="Liechtenstein">Liechtenstein</option>
                   <option value="Lithuania">Lithuania</option>
                   <option value="Luxembourg">Luxembourg</option>
                   <option value="Macao">Macao</option>
                   <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic
                     of
                   </option>
                   <option value="Madagascar">Madagascar</option>
                   <option value="Malawi">Malawi</option>
                   <option value="Malaysia">Malaysia</option>
                   <option value="Maldives">Maldives</option>
                   <option value="Mali">Mali</option>
                   <option value="Malta">Malta</option>
                   <option value="Marshall Islands">Marshall Islands</option>
                   <option value="Martinique">Martinique</option>
                   <option value="Mauritania">Mauritania</option>
                   <option value="Mauritius">Mauritius</option>
                   <option value="Mayotte">Mayotte</option>
                   <option value="Mexico">Mexico</option>
                   <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                   <option value="Moldova, Republic of">Moldova, Republic of</option>
                   <option value="Monaco">Monaco</option>
                   <option value="Mongolia">Mongolia</option>
                   <option value="Montenegro">Montenegro</option>
                   <option value="Montserrat">Montserrat</option>
                   <option value="Morocco">Morocco</option>
                   <option value="Mozambique">Mozambique</option>
                   <option value="Myanmar">Myanmar</option>
                   <option value="Namibia">Namibia</option>
                   <option value="Nauru">Nauru</option>
                   <option value="Nepal">Nepal</option>
                   <option value="Netherlands">Netherlands</option>
                   <option value="Netherlands Antilles">Netherlands Antilles</option>
                   <option value="New Caledonia">New Caledonia</option>
                   <option value="New Zealand">New Zealand</option>
                   <option value="Nicaragua">Nicaragua</option>
                   <option value="Niger">Niger</option>
                   <option value="Nigeria">Nigeria</option>
                   <option value="Niue">Niue</option>
                   <option value="Norfolk Island">Norfolk Island</option>
                   <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                   <option value="Norway">Norway</option>
                   <option value="Oman">Oman</option>
                   <option value="Pakistan">Pakistan</option>
                   <option value="Palau">Palau</option>
                   <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                   <option value="Panama">Panama</option>
                   <option value="Papua New Guinea">Papua New Guinea</option>
                   <option value="Paraguay">Paraguay</option>
                   <option value="Peru">Peru</option>
                   <option value="Philippines">Philippines</option>
                   <option value="Pitcairn">Pitcairn</option>
                   <option value="Poland">Poland</option>
                   <option value="Portugal">Portugal</option>
                   <option value="Puerto Rico">Puerto Rico</option>
                   <option value="Qatar">Qatar</option>
                   <option value="Reunion">Reunion</option>
                   <option value="Romania">Romania</option>
                   <option value="Russian Federation">Russian Federation</option>
                   <option value="Rwanda">Rwanda</option>
                   <option value="Saint Helena">Saint Helena</option>
                   <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                   <option value="Saint Lucia">Saint Lucia</option>
                   <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                   <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                   <option value="Samoa">Samoa</option>
                   <option value="San Marino">San Marino</option>
                   <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                   <option value="Saudi Arabia">Saudi Arabia</option>
                   <option value="Senegal">Senegal</option>
                   <option value="Serbia">Serbia</option>
                   <option value="Seychelles">Seychelles</option>
                   <option value="Sierra Leone">Sierra Leone</option>
                   <option value="Singapore">Singapore</option>
                   <option value="Slovakia">Slovakia</option>
                   <option value="Slovenia">Slovenia</option>
                   <option value="Solomon Islands">Solomon Islands</option>
                   <option value="Somalia">Somalia</option>
                   <option value="South Africa">South Africa</option>
                   <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich
                     Islands
                   </option>
                   <option value="Spain">Spain</option>
                   <option value="Sri Lanka">Sri Lanka</option>
                   <option value="Sudan">Sudan</option>
                   <option value="Suriname">Suriname</option>
                   <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                   <option value="Swaziland">Swaziland</option>
                   <option value="Sweden">Sweden</option>
                   <option value="Switzerland">Switzerland</option>
                   <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                   <option value="Taiwan">Taiwan</option>
                   <option value="Tajikistan">Tajikistan</option>
                   <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                   <option value="Thailand">Thailand</option>
                   <option value="Timor-leste">Timor-leste</option>
                   <option value="Togo">Togo</option>
                   <option value="Tokelau">Tokelau</option>
                   <option value="Tonga">Tonga</option>
                   <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                   <option value="Tunisia">Tunisia</option>
                   <option value="Turkey">Turkey</option>
                   <option value="Turkmenistan">Turkmenistan</option>
                   <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                   <option value="Tuvalu">Tuvalu</option>
                   <option value="Uganda">Uganda</option>
                   <option value="Ukraine">Ukraine</option>
                   <option value="United Arab Emirates">United Arab Emirates</option>
                   <option value="United Kingdom">United Kingdom</option>
                   <option value="United States">United States</option>
                   <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                   <option value="Uruguay">Uruguay</option>
                   <option value="Uzbekistan">Uzbekistan</option>
                   <option value="Vanuatu">Vanuatu</option>
                   <option value="Venezuela">Venezuela</option>
                   <option value="Viet Nam">Viet Nam</option>
                   <option value="Virgin Islands, British">Virgin Islands, British</option>
                   <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                   <option value="Wallis and Futuna">Wallis and Futuna</option>
                   <option value="Western Sahara">Western Sahara</option>
                   <option value="Yemen">Yemen</option>
                   <option value="Zambia">Zambia</option>
                   <option value="Zimbabwe">Zimbabwe</option>
                 </Select></div></div></div>

              <div className='w-full flex justify-center mt-5'
              ><input className='p-4 bg-black text-2xl font-bold text-white rounded-md mx-auto  ' type={"submit"} >

              </input></div>
            </form>
          </TabPanel>
          <TabPanel p={0}>
            <ChangePassword/>
          </TabPanel>
          <TabPanel p={0}>
            <EmailAndSMS/>
          </TabPanel>
          <TabPanel p={0}>
            <ManageContact/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>



  </>)
}


///@TODO extract Avatar associated things to separate component for better readability