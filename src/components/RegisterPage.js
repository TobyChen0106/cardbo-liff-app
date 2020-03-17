//images
import cancel from '../images/cancel.png'

import React, { Component } from 'react';
import './register.css'
//slider
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

//select
import Select from 'react-select';

// Liff
const liff = window.liff;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '??',
            userId: undefined,

            nickName: "",
            age: 20,
            gender: "",
            userCards: [],
            cards: [{
                bank: '',
                card: '',
                cardID: '',
                selectedBank: null,
                selectedCard: null,
                options: []
            }],

            agreeCheck: false,
            bankList: ['台新銀行', '渣打銀行', '彰化銀行', '花旗銀行', '第一銀行', '遠東商銀', '聯邦銀行', '永豐銀行', '元大銀行', '上海商銀', '台北富邦', '兆豐銀行',
                '新光銀行', '中國信託', '星展銀行', '華南銀行', '陽信銀行', '滙豐銀行', '日盛銀行', '國泰世華', '合作金庫', '臺灣企銀',
                '王道銀行', '台灣樂天', '凱基銀行', '玉山銀行', '臺灣銀行', '台中商銀', '土地銀行', '安泰銀行', '三信銀行', '高雄銀行', '華泰銀行',
                '美國運通'],
            allCards: {},
            IDregistered: false,
            saveOrSubmit: "Submit",
            // allCards: _allCards,
        };

    }
    componentWillMount() {
        var allCardList;
        fetch('/api/cards').catch(function (error) {
            window.alert("[Error] " + error);
        }).then(
            res => res.json()
        ).then((data) => {
            this.setState({ allCards: data })
            allCardList = data;
            // console.log(data);
        });
        var profile;
        liff.init({ liffId: '1653324267-e53V2QWz' }).then(() => {
            if (!liff.isLoggedIn()) {
                liff.login({ redirectUri: "https://localhost:3000" });
            }
            profile = liff.getProfile();
            if (!profile.userId) {
                window.alert("USER ID ERROR!");
            }
            this.setState({
                displayName: profile.displayName,
                userId: profile.userId
            });
        });
        liff.ready.then(() => {
            fetch('/api/check-users', {
                method: 'POST',
                body: JSON.stringify({ userID: profile.userId }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).catch(function (error) {
                window.alert("[Error] " + error);
            }).then(
                res => res.json()
            ).then((data) => {
                if (data) {
                    this.setState({ IDregistered: true });
                    this.setState({ agreeCheck: true });

                    this.setState({ userId: data.lineID });
                    this.setState({ nickName: data.nickName });
                    this.setState({ age: data.age });
                    this.setState({ gender: data.gender });
                    this.setState({ saveOrSubmit: "Save" });
                    const bankList = this.state.bankList.map((i, index) => (
                        { label: i, value: index }
                    ));
                    var cards = [];
                    if (data.cards.length > 0) {
                        for (var i = 0; i < data.cards.length; ++i) {
                            var cardIndex = allCardList.map((i, index) => (i.cardID)).indexOf(data.cards[i]);
                            var _card = allCardList[cardIndex];
                            var _options = allCardList.filter(card => card.bankName === _card.bankName).map((_i, _index) => (
                                { label: _i.cardName, value: _index }
                            ));
                            var userCard = {
                                bank: _card.bankName,
                                card: _card.cardName,
                                cardID: _card.cardID,
                                selectedBank: { label: _card.bankName, value: bankList.indexOf(_card.bankName) },
                                selectedCard: _options.filter(op => op.label === _card.cardName)[0],
                                options: _options
                            }
                            cards.push(userCard);
                        }
                    } else {
                        cards.push({ bank: '', card: '', options: [] });
                    }
                    this.setState({ cards: cards });
                } else {
                    this.setState({ IDregistered: false });
                }
            });
        });
    }
    componentDidMount() {
        var allCardList = this.state.allCards;
        // fetch('/api/check-users', {
        //     method: 'POST',
        //     body: JSON.stringify({ userID: this.state.userId }),
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // }).catch(function (error) {
        //     window.alert("[Error] " + error);
        // }).then(
        //     res => res.json()
        // ).then((data) => {
        //     if (data) {
        //         this.setState({ IDregistered: true });
        //         this.setState({ agreeCheck: true });

        //         this.setState({ userId: data.lineID });
        //         this.setState({ nickName: data.nickName });
        //         this.setState({ age: data.age });
        //         this.setState({ gender: data.gender });
        //         this.setState({ saveOrSubmit: "Save" });
        //         const bankList = this.state.bankList.map((i, index) => (
        //             { label: i, value: index }
        //         ));
        //         var cards = [];
        //         if (data.cards.length > 0) {
        //             for (var i = 0; i < data.cards.length; ++i) {
        //                 var cardIndex = allCardList.map((i, index) => (i.cardID)).indexOf(data.cards[i]);
        //                 var _card = allCardList[cardIndex];
        //                 var _options = allCardList.filter(card => card.bankName === _card.bankName).map((_i, _index) => (
        //                     { label: _i.cardName, value: _index }
        //                 ));
        //                 var userCard = {
        //                     bank: _card.bankName,
        //                     card: _card.cardName,
        //                     cardID: _card.cardID,
        //                     selectedBank: { label: _card.bankName, value: bankList.indexOf(_card.bankName) },
        //                     selectedCard: _options.filter(op => op.label === _card.cardName)[0],
        //                     options: _options
        //                 }
        //                 // console.log(userCard);
        //                 cards.push(userCard);
        //             }
        //         } else {
        //             cards.push({ bank: '', card: '', options: [] });
        //         }
        //         this.setState({ cards: cards });
        //     } else {
        //         this.setState({ IDregistered: false });
        //     }
        // });
    }
    formOnSubmit = () => {
        if (this.state.age === 0) {
            alert('請輸入年齡!');
        }
        else if (!this.state.agreeCheck) {
            alert('請閱讀並同意使用者服務條款!');
        } else {
            var userCards = this.state.cards.filter(card => card.card !== '' && card.bank !== '').map((i, index) => (
                this.state.allCards.filter(card => card.cardName === i.card && card.bankName === i.bank)[0].cardID
            ));
            // console.log(userCards)

            const newUser = {
                lineID: this.state.userId,
                displayName: this.state.displayName,
                nickName: this.state.nickName,
                age: this.state.age,
                gender: this.state.gender,
                cards: userCards,
                stores: []
            };
            fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).catch(function (error) {
                window.alert("[Error] " + error);
            })
                // .then(
                //     res => res.json()
                // ).then((data) => {
                //     console.log(data);
                // }).then(() => {
                //     // liff.sendMessages([{
                //     //     'type': 'text',
                //     //     'text': "Done!"
                //     // }])
                // }).catch(function (error) {
                //     window.alert("Error sending message: " + error);
                // })
                .then(() => {
                    liff.closeWindow();
                })
        }
    }

    handleNickNameChange = (event) => {
        this.setState({ nickName: event.target.value });
    }

    handleChangeAge = (event) => {
        this.setState({ age: event });
    }

    handleChangeCheck = (event) => {
        this.setState({ agreeCheck: !this.state.agreeCheck });
    }
    handleGenderChange = (gender) => {
        this.setState({ gender: gender });
    }

    handleSelectBank = (e, id) => {
        const label = e.label;
        var new_cards = this.state.cards;

        new_cards[id].options = this.state.allCards.filter(card => card.bankName === label).map((i, index) => (
            { label: i.cardName, value: index }
        ));
        new_cards[id].bank = label;
        new_cards[id].selectedBank = e;
        this.setState({ cards: new_cards });
        // console.log(e)
    }
    handleSelectCard = (e, id) => {
        const label = e.label;
        var new_cards = this.state.cards;
        new_cards[id].selectedCard = e;
        new_cards[id].card = label;
        this.setState({ cards: new_cards });
        // console.log(e)
    }
    handleCancel = (e, id) => {
        // this.setState(prevState => ({
        //     cards: prevState.cards.splice(id,1)
        // }))
        var new_cards = this.state.cards;
        new_cards.splice(id, 1)
        this.setState({ cards: new_cards })
        // console.log(e)
        console.log(id)
    }
    handleAddCard = () => {
        this.setState(prevState => ({
            cards: [...prevState.cards, { bank: '', card: '', options: [] }]
        }))
    }
    render() {
        const bankList = this.state.bankList.map((i, index) => (
            { label: i, value: index }
        ));

        const cardLists = this.state.cards.map((i, index) => (
            <div className="card">
                <div className="selcet-bank-container">
                    <Select options={bankList} onChange={(e) => this.handleSelectBank(e, index)} value={i.selectedBank} isSearchable={false} />
                </div>
                <div className="selcet-card-container">
                    <Select options={i.options} onChange={(e) => this.handleSelectCard(e, index)} value={i.selectedCard} isSearchable={false} />
                </div>
                <button className="cancel-button" onClick={(e) => this.handleCancel(e, index)}>
                    <img src={cancel} className="cancel"></img>
                </button>
            </div>
        ));
        if (this.state.IDregistered) {
            return (
                <div className="register chineese-font">
                    <div id="cardbo-register-data" className="row">
                        <div className="register-title-wrapper">卡伯會員中心</div>
                        <div className="register-title-info" >{this.state.nickName === '' ? this.state.displayName : this.state.nickName}，您可以在這裡修改您的基本資料:</div>
                    </div>

                    <div className="register-form-contaniner">
                        <div className="row nick-name">
                            <div className="nick-name-title-container">
                                <label>您希望我們如何稱呼您?</label>
                            </div>
                            <div className="nick-name-input-container">
                                <input className="nick-name-input" type="text"
                                    value={this.state.nickName} onChange={this.handleNickNameChange} />
                            </div>
                        </div>
                        <div className="row register-age">
                            <div className="age-container">
                                <div className="age">您的年齡:</div>
                                <div className="age-number">{this.state.age}</div>
                            </div>
                            <div className="age-slider-contain"> <Slider min={0} max={80} defaultValue={20} onChange={this.handleChangeAge} /></div>
                        </div>
                        <div className="row register-gender">
                            <div>您的性別:</div>
                            <div className="option-container">
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Male') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Male" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Male" ? '#ffffff' : '#000000'
                                    }}>
                                    Male
                                </button>
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Other') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Other" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Other" ? '#ffffff' : '#000000'
                                    }}>
                                    Other
                                </button>
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Female') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Female" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Female" ? '#ffffff' : '#000000'
                                    }}>
                                    Female
                                </button>
                            </div>
                        </div>
                        <div className="row manage-card">
                            <div className="my-card-title">
                                輸入您的信用卡:
                            </div>
                            <div className="card-lists-container">
                                <div className="card-lists">
                                    {cardLists}
                                </div>
                                <button className="add-card" onClick={this.handleAddCard}>
                                    + add new card
                                </button>

                            </div>
                        </div>

                        <div className="row">
                            <button className="submit-button" onClick={this.formOnSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="register chineese-font">
                    <div id="cardbo-register-data" className="row">
                        <div className="register-title-wrapper">卡伯會員註冊</div>
                        <div className="register-title-info" >{this.state.nickName === '' ? this.state.displayName : this.state.nickName}，歡迎註冊卡伯，為了提供更精準的服務，我們需要蒐集一些您的基本資料:</div>
                    </div>

                    <div className="register-form-contaniner">
                        <div className="row nick-name">
                            <div className="nick-name-title-container">
                                <label>您希望我們如何稱呼您?</label>
                            </div>
                            <div className="nick-name-input-container">
                                <input className="nick-name-input" type="text"
                                    value={this.state.nickName} onChange={this.handleNickNameChange} />
                            </div>
                        </div>
                        <div className="row register-age">
                            <div className="age-container">
                                <div className="age">您的年齡:</div>
                                <div className="age-number">{this.state.age}</div>
                            </div>
                            <div className="age-slider-contain"> <Slider min={0} max={80} defaultValue={20} onChange={this.handleChangeAge} /></div>
                        </div>
                        <div className="row register-gender">
                            <div>您的性別:</div>
                            <div className="option-container">
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Male') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Male" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Male" ? '#ffffff' : '#000000'
                                    }}>
                                    Male
                                </button>
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Other') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Other" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Other" ? '#ffffff' : '#000000'
                                    }}>
                                    Other
                                </button>
                                <button className="gender-card" onClick={() => { this.handleGenderChange('Female') }}
                                    style={{
                                        backgroundColor: this.state.gender === "Female" ? '#58a8d7' : '#ffffff',
                                        color: this.state.gender === "Female" ? '#ffffff' : '#000000'
                                    }}>
                                    Female
                                </button>
                            </div>
                        </div>
                        <div className="row manage-card">
                            <div className="my-card-title">
                                輸入您的信用卡:
                            </div>
                            <div className="card-lists-container">
                                <div className="card-lists">
                                    {cardLists}
                                </div>
                                <button className="add-card" onClick={this.handleAddCard}>
                                    + add new card
                                </button>

                            </div>
                        </div>
                        <div className="row">
                            <input id="agree" type="checkbox" name="checkbox" value="check" defaultChecked={this.state.agreeCheck} onChange={this.handleChangeCheck} />
                            我已閱讀並同意<a href="#">使用者服務條款</a>
                        </div>
                        <div className="row">
                            <button className="submit-button" onClick={this.formOnSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            );
        }

    }
}
export default App;