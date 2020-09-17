import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../Layout/MyDash/Dashboard";
import Wrapper from "./styles";
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

const ContactUs = () => {    
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `jwt ${token}`,
      },
    };
    const { SERVER_URL } = useContext(AuthContext);

    const registerInquery = () => {
			if (!userName) {
				alert("이름을 입력해주세요");
			} else if (!userEmail) {
				alert("이메일을 입력해주세요");
			}	else if (!subject) {
				alert("문의 제목을 입력해주세요");
			}	else if (!message) {
				alert("문의 내용을 입력해주세요");
			} else {
				const url = `${SERVER_URL}/accounts/inquery/`;
				const inqueryData = {
					name: userName,
					email: userEmail,
					subject,
					message,
				};
				
				axios
					.post(url, inqueryData, config)
					.then(() => {            
						setUserName("");
						setUserEmail("");
						setSubject("");
						setMessage("");
					})
					.catch((err) => {
						console.log(err.response);
					});
			}
    };

    const handleSetUserName = (e) => {
        setUserName(e.target.value);
      };
    const handleSetUserEmail = (e) => {
        setUserEmail(e.target.value);
    };
    const handleSetSubject = (e) => {
        setSubject(e.target.value);
    };
    const handleSetMessage = (e) => {
        setMessage(e.target.value);
    };
    
    return (
			<Wrapper>
            <Layout>                
                <section>
                    <Grid className="contact-grid">
                        <h2 className="contact-title">
                        Contact us
                        </h2>
                    </Grid>
                    <Grid container>
                    <Grid xs={12} md={6} className="contact-grid">
                        <Card>
                        <CardContent>
                            <div className="form-header">
                            <h1>
                                <i class="fas fa-envelope"></i> Write to us
                            </h1>
                            </div>
                            <div className="contact-form">
																
                                <FormControl fullWidth className="contact-form-control">
                                    <InputLabel>Name</InputLabel>
                                    <Input
                                        id="standard-adornment-name"
                                        onChange={(e) => {
																					handleSetUserName(e);
                                        }}
                                        value={userName}
                                        startAdornment={<i class="fas fa-user fa-lg contact-fa"></i>}
																				/>
                                </FormControl>
                                
                                <FormControl fullWidth className="contact-form-control">
                                    <InputLabel>Email</InputLabel>
                                    <Input
                                        id="form-email"
                                        onChange={(e) => {
																					handleSetUserEmail(e);
                                        }}
                                        value={userEmail}
                                        startAdornment={<i class="fas fa-envelope contact-fa"></i>}
																				/>
                                </FormControl>

                                <FormControl fullWidth className="contact-form-control">
                                    <InputLabel>Subject</InputLabel>
                                    <Input
                                        id="form-subject"
                                        onChange={(e) => {
																					handleSetSubject(e);
                                        }}
                                        value={subject}
                                        startAdornment={<i class="fas fa-tag contact-fa"></i>}
																				/>
                                </FormControl>
                                
                                <FormControl fullWidth className="contact-form-control">
                                    <InputLabel>Message</InputLabel>
                                    <Input
                                        id="form-text"
                                        onChange={(e) => {
																					handleSetMessage(e);
                                        }}
                                        value={message}
                                        multiline={true}
                                        startAdornment={<i class="fas fa-pencil-alt contact-fa"></i>}
																				/>
                                </FormControl>
                            </div>
														<p style={{textAlign:"right"}}>빠른 시일 내에 위에 적어주신 이메일로 답변 드리겠습니다 <i class="far fa-smile"></i></p>
                            <div className="contact-btn-div">
                                <Button
                                variant="contained"
                                color="primary"
                                onClick={registerInquery}
                                className="contact-btn-submit"
                                >
                                Submit</Button>
                            </div>
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={12} md={6} className="contact-grid contact-btn-div">
                        <div
                        id="map-container"
                        style={{ height: "350px" }}
                        >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.2394843424454!2d127.29615161523496!3d36.35497768004275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35654cad3d82caa9%3A0xb3fbce2dcaf4b67f!2z7IK87ISx7ZmU7J6sIOycoOyEseyXsOyImOybkA!5e0!3m2!1sen!2skr!4v1597592382016!5m2!1sen!2skr"
                            title="This is a unique title"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                        />
                        </div>
                        <br />
                        <Grid container className="contact-grid">
                        <Grid item lg="4" md="4" sm="4">
                            <Button className="contact-btn">
                            <i class="fas fa-map-marker-alt"></i>
                            </Button>
                            <p>Daejeon</p>
                        </Grid>
                        <Grid item lg="4" md="4" sm="4">
                            <Button className="contact-btn">
                            <i class="fas fa-phone"></i>
                            </Button>
                            <p>042-123-1234</p>
                        </Grid>
                        <Grid item lg="4" md="4" sm="4">
                            <Button className="contact-btn">
                            <i class="fas fa-envelope"></i>
                            </Button>
                            <p>kkobuk@gmail.com</p>
                        </Grid>
                    </Grid>
                    </Grid>
                    </Grid>
                </section>
            </Layout>
        </Wrapper>
    );
}

export default ContactUs;