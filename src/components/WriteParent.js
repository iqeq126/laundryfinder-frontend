import WriteProduct from "./WriteProduct";
import { useState } from "react";

const WriteParent = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');
    const [selectedOption4, setSelectedOption4] = useState('');
    const [selectedOption5, setSelectedOption5] = useState('');
    const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    };
    const handleSelectChange1 = (selectedOption1) => {
    setSelectedOption1(selectedOption1);
    };
    const handleSelectChange2 = (selectedOption2) => {
    setSelectedOption2(selectedOption2);
    };
    const handleSelectChange3 = (selectedOption3) => {
    setSelectedOption3(selectedOption3);
    };
    const handleSelectChange4 = (selectedOption4) => {
    setSelectedOption4(selectedOption4);
    };
    const handleSelectChange5 = (selectedOption5) => {
    setSelectedOption5(selectedOption5);
    };
    <WriteProduct
    selectedOption={selectedOption}
    selectedOption1={selectedOption1}
    selectedOption2={selectedOption2}
    selectedOption3={selectedOption3}
    selectedOption4={selectedOption4}
    selectedOption5={selectedOption5}
    handleSelectChange={handleSelectChange}
    handleSelectChange1={handleSelectChange1}
    handleSelectChange2={handleSelectChange2}
    handleSelectChange3={handleSelectChange3}
    handleSelectChange4={handleSelectChange4}
    handleSelectChange5={handleSelectChange5}
    />

}
export default WriteParent;