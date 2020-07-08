import React, { Component } from "react";
import { connect, useSelector,useDispatch } from "react-redux";
import {add,sub} from '../actions'
// const Home = () => <h1>Home</h1>;
import '../css/lightstylesheet.css';
import { userService,activityService } from '../services';
import { STORAGE_KEYS } from 'utils/constants';
const COURSE_API_URL = STORAGE_KEYS.COURSE_API_URL;

class Home extends Component {

//function Home() {

    constructor(props) {
        super(props);
        this.state = {groups: [], activity: [], isLoading: true , userName: localStorage.getItem("name") ,
            followercount:0 , followingcount :0};

        this.submitAddFollower = this.submitAddFollower.bind(this);
    }

    componentDidMount = async()=> {
        this.setState({isLoading: true});
        const userId=localStorage.getItem("userId");

        const userResponse =await userService.getUserInfo(userId);
        this.setState({followercount: userResponse.followercount, followingcount: userResponse.followingcount});


        const activityResponse =await activityService.getAllActivity(0);
        this.setState({activity: activityResponse});


        const response =await userService.getAllPeoples(userId);
        this.setState({groups: response, isLoading: false});

        // fetch(`http://localhost:5000/users`)
        //     .then(response => response.json())
        //     .then(data => this.setState({groups: data, isLoading: false}));

    }


     submitAddFollower = (followerId) => {
         const response = userService.addFollower(localStorage.getItem("userId"), followerId);
         window.location.reload(false);
     }

    // const   count = useSelector(state => state.mycounter);
    //const dispatch= useDispatch();
    //const userName= localStorage.getItem("name");


     NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) =>
            <li>{number}</li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }

    //const numbers = [1, 2, 3, 4, 5];
    //var groups= [];

    // LoadUsers() {
    //     fetch(`http://localhost:5000/users`)
    //         .then(response => response.json())
    //         .then(data => groups);
    //
    //
    //     // const data =  userService.getAll();
    //     const listItems = groups.map((number) =>
    //         <li>{number.name}</li>
    //     );
    //     return (
    //         <ul>{listItems}</ul>
    //     );
    // }


    // loadUsers1 = async() => {
    //     const data = await userService.getAll();
    //
    //     var content = "";
    //     var results = document.getElementById("lstPeoples");
    //     for (let i = 0; i < data.length; i++) {
    //         content += "<div class='sugguest-user'>";
    //         content += "<div class='sugguest-user-dt'>";
    //         //content += "<img src='images/homepage/left-side/left-img-1.jpg' alt=''>";
    //         content += "<a href='user_dashboard_activity.html'><h4>" + data[i].name + "</h4></a>";
    //         content += "</div>";
    //         content += "<button class='request-btn'><i class='fas fa-user-plus'></i></button>";
    //         content += "</div>";
    //     }
    //
    //     return content;
    // };

    // var content = loadUsers();

    render() {
        const numbers = [1, 2, 3, 4, 5];

        const {userName , groups, followercount,followingcount,activity} = this.state;
        const groupList = groups.map(group => {
            return <div key={group.id} className="sugguest-user">
                <div className="sugguest-user-dt">
                    <a href="user_dashboard_activity.html">
                        <img src={require("../css/images/homepage/left-side/left-img-1.jpg")}
                             alt=""/></a>
                    <a href="#"><h4>{group.name}</h4></a>
                </div>
                <button className="request-btn"
                        onClick={() => this.submitAddFollower(group.id)}
                        ><i className="fas fa-user-plus"></i></button>
            </div>
        });



        const activityList = activity.map(group => {
            var creationdate=group.creationdate;
            var dateTimeSplit = creationdate.split('T');
            var dateSplit = dateTimeSplit[0];
            var timeSplit = dateTimeSplit[1];
            const post="posted "+dateSplit + " " +timeSplit;

            let source = COURSE_API_URL+'/img/'+group.filename;

            return <div key={group.id} className="activity-posts">
                <div className="activity-group1">
                    <div className="ain-user-dts1">
                        <div className="user-text3">
                            <h4>{group.user.name}</h4>
                            <span>{post}</span>


                        </div></div></div>
                <div>
                    <img className="img-fluid w-100" src={source} alt="" />
                </div>
                <div className="activity-descp">{group.description}</div>
            </div>
        });


        return (
        <main>
            <div className="main-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="main-left-sidebar">
                                <div className="user-data full-width">
                                    <div className="user-profile">
                                        <div className="username-dt dpbg-1">
                                            <div className="usr-pic">


                                                <img src={require("../css/images/homepage/left-side/profile-dp.jpg")}
                                                     alt=""/>

                                            </div>
                                        </div>
                                        <div className="user-main-details">
                                            <h4><span id="lblUserProfileName">{userName} </span></h4>

                                        </div>
                                        <ul className="followers-dts">
                                            <li>
                                                <div className="followers-dt-sm">
                                                    <h4>Followers</h4>
                                                    <span>{followercount}</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="followers-dt-sm">
                                                    <h4>Following</h4>
                                                    <span>{followingcount}</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="profile-link">
                                            <a href="/myDashboardActivity">View Profile</a>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="user-data full-width">
                                <div className="categories-left-heading">
                                    <h3>Peoples</h3>
                                </div>

                                <div id="lstPeoples">
                                    {groupList}
                                </div>

                                {/*<div>*/}
                                    {/*<this.NumberList numbers={numbers} />*/}
                                {/*</div>*/}

                            </div>
                        </div>


                        <div className="col-lg-6 col-md-7">
                            <div className="main-posts">


                                <div id="lstActivity">
                                    {activityList}
                                </div>

                            </div>
                        </div>



                    </div>
                </div>
            </div>


        </main>
        );
    }
}


export default Home;
