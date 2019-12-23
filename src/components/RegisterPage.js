import React, { Component } from 'react';
import './register.css'
//slider
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

// Liff
const liff = window.liff;

// mongoose
const mongoose = require('mongoose');
const User = require('../models/User');
// import User from '../models/User.js'



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: props.displayName,
            userId: props.userId,
            pictureUrl: props.pictureUrl,
            statusMessage: props.statusMessage,

            nickName: "",
            age: 0,
            gender: "other",
            cards: [],

            agreeCheck: false,
        };
    }

    componentDidMount() {

    }
    formOnSubmit = () => {
        console.log("hahaha");
        console.log(User);
        if(this.state.age === 0){
            alert('請輸入年齡!');
        }
        else if (!this.state.agreeCheck) {
            alert('請閱讀並同意使用者服務條款!');
        }else {
<<<<<<< HEAD
            const newUser = new User({
                
                lineID: this.state.userId,
                displayName: this.state.displayName,
                nickName: this.state.nickName,
                age: this.state.age,
                gender: this.state.gender,
                cards: this.state.cards
            });
=======
            alert(User);
            // const newUser = new User({
            //     lineID: this.state.userId,
            //     displayName: this.state.displayName,
            //     nickName: this.state.nickName,
            //     age: this.state.age,
            //     gender: this.state.gender,
            //     cards: this.state.cards,
            // });
            
            // newUser.save(function(err, user){
            //     if (err){
            //         console.log(err);
            //     }
            // }).then((user) => {
            //     console.log('New user created!');
            //     console.log(user);
            // });
>>>>>>> c8b91634c1620fe2d4e42ace93380105389457a1

            liff.sendMessages([{
                type: 'text',
                text: "我填完囉!"
            }, {
                type: 'sticker',
                packageId: '2',
                stickerId: '144'
            }]).catch(function (error) {
                window.alert("Error sending message: " + error);
            }).then(() => {
                liff.closeWindow();
            })
        }
    }
    handleNickNameChange = (event) => {
        this.setState({ nickName: event.target.value });
    }
    changeAge = (event) => {
        this.setState({ age: event });
    }

    handleChangeCheck = (event) => {
        this.setState({ agreeCheck: !this.state.agreeCheck });
    }
    render() {
        return (
            <div className="register">
                <div id="cardbo-register-data" class="row">
                    <h2>會員註冊說明</h2>
                    <div class="info" id='info'>"我是說明"</div>
                </div>

                <form action="#" onSubmit={() => this.formOnSubmit()} id="register-form">
                    <div class="row">
                        <div>暱稱</div>
                        <input id="nick-name" type="text" value={this.state.nickName} onChange={this.handleNickNameChange} />
                    </div>
                    <div class="row">
                        <div>年齡</div>
                        {this.state.age}
                        <div className="slider-contain"> <Slider min={0} max={100} defaultValue={0} onChange={this.changeAge} /></div>
                    </div>
                    <div class="row">
                        <div>性別</div>
                    </div>
                    <div class="row">
                        <div class="my-card-title">我的信用卡</div>
                        <div class="card-lists">

                        </div>
                        <input type="text" name="text" value="" id="" />
                    </div>
                    <div class="row">
                        <input id="agree" type="checkbox" name="checkbox" value="check" defaultChecked={this.state.agreeCheck} onChange={this.handleChangeCheck} />
                        我已閱讀並同意<a href="#">使用者服務條款</a>
                    </div>
                    <div class="row">
                        <input type="submit" name="submit" value="submit" id="submit-button" />
                    </div>
                </form>
            </div>
        );
    }
}
export default App;