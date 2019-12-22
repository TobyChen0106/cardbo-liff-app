import React, { Component } from 'react';
import './register.css'
const liff = window.liff;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          displayName : props.displayName,
          userId : props.userId,
          pictureUrl : props.pictureUrl,
          statusMessage : props.statusMessage
        };
      }
    
      componentDidMount() {
        
      }
      formOnSubmit = () =>{

      }
      render() {
        return (
            <div>
                <div id="cardbo-register-data" class="row">
                    <h2>會員註冊說明</h2>
                    <div class="info" id='info'>"我是說明"</div>
                </div>
            
                <form action="#" onsubmit={() => this.formOnSubmit()} id="register-form">
                    <div class="row">
                        <div>暱稱</div>
                        <input type="text" name="text" value="" id="name" />
                    </div>
                    <div class="row">
                        <div>年齡</div>
                    </div>
                    <div class="row">
                        <div>性別</div>
                    </div>
                    <div class="row">
                        <div class="my-card-title">我的信用卡</div>
                        <div class = "card-lists">
                            
                        </div>
                        <input type="text" name="text" value="" id="" />
                    </div>
                    <div class="row">
                        <input type="checkbox" name="checkbox" value="check" id="agree" />
                        我已閱讀並同意<a href="#">使用者服務條款</a>
                    </div>
                    <div class="row">
                        <input type="submit" name="submit" value="submit" id="submit-button"/>
                    </div>
                </form>
            </div>
        );
      }
}
export default App;