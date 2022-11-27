import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkPassUser, updateUserProfile } from "../../Redux/Actions/userActions";
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from "axios";

const baseURL = "http://localhost:5000/";
const inforShopRight = () => {

}
export default inforShopRight;
