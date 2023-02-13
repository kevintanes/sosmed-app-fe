import React from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import FormInputLabel from '../Components/form';

function Register(props) {
    //store form input
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")

    const navigate = useNavigate();

    //----------------- KODE INI AKAN SELALU DIPAKE!!! -------------------------------
    const btnRegister = async () => {
        try {

            if (username === "" || email === "" || password === "") {
                alert("monggo di isi!!")
            } else {
                let res = await axios.get(`http://localhost:2000/users?email=${email}`);

                if (res.data.length > 0) {
                    alert("email is existed, change your email!");
                } else {

                    let respon = await axios.post("http://localhost:2000/users", {      //jika di hover parameter nya butuh "any" maka ini object
                        username: username,
                        email: email,
                        password: password,
                        status: "unverified",
                        imgProfile: "",
                        role: "user"
                    });
                    if (respon.data.id) {
                        alert(`register berhasil`);
                    } else {
                        alert(`register gagal`)
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };


    // ---------------------------------------CARA MAS ABDI-------------------------------------------
    /*
    const btnRegister = () => {
        if (username === "" || email === "" || password === "") {
            alert("FILL IN ALL FORM!!") //-> untuk proteksi jika user tidak memasukan input nya
        } else {
            let domain = /\.(com|id|co.id)/;     //-> proteksi jika email nya tidak memakai domain
            console.log(email.match(domain));

            if (email.includes("@") && email.match(domain)) {       //-> proteksi
                axios.get(`http://localhost:2000/users?email=${email}`)
                    .then((res) => {
                        console.log(res);
                        if (res.data.length > 0) {
                            alert("email is existed, change your email!!")
                        } else {
                            // lanjut axios post untuk submit data

                            axios.post("http://localhost:2000/users", {         //jika di hover parameter nya butuh "any" maka ini object
                                username,
                                email,
                                password,
                                status: "unverified",
                                imgProfile: "",
                                role: "user"
                            }).then((respon) => {
                                if (respon.data.id) {
                                    alert("Registrasi Berhasil");
                                } else {
                                    alert("Registrasi Gagal!");
                                }
                            }).catch(error => {
                                alert("Registration Failed!");
                                console.log(error);
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })

            } else {
                alert("your email is wrong!")
            }

        }
    };
    */

    // ------------------ KODINGAN MAS ABDI DIATAS DI SEDERHANAIN MENJADI SEPERTI DIBAWAH --------------------
    /*
    const btnRegister = async () => {
        try {
            //1. MEMERIKSA FORM SUDAH TERISI SEMUA ATAU BELUM
            if (username === "" || email === "" || password === "") {
                alert("FILL IN ALL FORM!!") //-> untuk proteksi jika user tidak memasukan input nya
            } else {
                let domain = /\.(com|id|co.id)/;     //-> proteksi jika email nya tidak memakai domain
                console.log(email.match(domain));
                // 2. MEMERIKSA EMAIL BENAR ATAU TIDAK
                if (email.includes("@") && email.match(domain)) {
                    // 3. MEMERIKSA EMAILNYA SUDAH TERDAFTAR ATAU TIDAK
                    let res = await axios.get(`http://localhost:2000/users?email=${email}`)
                    if (res.data.length > 0) {
                        alert(`email is existed, change your email!!`)
                    } else {
                        // 4. MENGIRIM DATA KE DATABASE
                        let respon = await axios.post("http://localhost:2000/users", {
                            username,
                            email,
                            password,
                            status: "unverified",
                            imgProfile: "",
                            role: "user"
                        });
                        if (respon.data.id) {
                            alert("register successfully");
                        } else {
                            alert("register failed")
                        }
                    }
                } else {
                    alert("your email is wrong!!")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    */
    if (props.loading) {
        return <></>
    } else {
        return (
            <div className='container mx-auto my-20 w-2/4'>
                <form className='py-10 border rounded shadow-lg'>
                    <h1 className='ml-5 text-5xl pb-2 font-semibold'>
                        Sign Up
                    </h1>
                    <span className='ml-5 md: text-xl'>Already have an account? <button onClick={() => navigate("/login")} className='text-blue-700 hover:underline'>Login</button> </span>
                    <FormInputLabel type="text" onChange={(e)=> setUsername(e.target.value)} placeholder="Type Username">
                        User Name
                    </FormInputLabel>
                    <FormInputLabel type="email" onChange={(e)=> setEmail(e.target.value)} placeholder="Type Your Email">
                        Email Address
                    </FormInputLabel>
                    <div className="mt-5 mx-5">
                        <label for="password" className="block mb-2  text-lg font-medium text-gray-900">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="••••••••" />
                    </div>

                    <div className='mt-10  mx-5 text-center '>
                        <button onClick={() => btnRegister()} type="button" className="w-full text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1 md:mr-3 ">Sign Up</button>
                    </div>
                </form>
            </div>

        );
    };
}

export default Register;