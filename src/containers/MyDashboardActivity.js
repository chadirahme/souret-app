import React, { Component } from "react";
import '../css/lightstylesheet.css';
import { userService,activityService } from '../services';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from '../shared/validator';
import { STORAGE_KEYS } from 'utils/constants';
const COURSE_API_URL = STORAGE_KEYS.COURSE_API_URL;

class MyDashboardActivity extends Component {


    constructor(props) {
        super(props);
        this.state = {groups: [], isLoading: true , userName: localStorage.getItem("name")  , txtActivity:'', userCreationDate:'',
            file: null, selectedFile: null};

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);

        this.handleImageChange = this.handleImageChange.bind(this)
    }

    componentDidMount = async()=> {
        this.setState({isLoading: true});
        const userId=localStorage.getItem("userId");

        const activityResponse =await activityService.getAllActivity(userId);
        this.setState({groups: activityResponse,isLoading: false});


        // fetch(`http://localhost:5000/activity`)
        //     .then(response => response.json())
        //     .then(data => this.setState({groups: data, isLoading: false}));
        //this.setState({file: userService.getImage()});

        var tmp=localStorage.getItem("userCreationDate");

        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var dateTimeSplit = tmp.split('T');
        var dateSplit = dateTimeSplit[0];

        var d = new Date(dateSplit);
        this.setState({userCreationDate:'Member since '+ monthNames[d.getMonth()] + ' ' + d.getFullYear()});

    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        //const { name } = target;

        let { txtActivity } = this.state;
        txtActivity = value;

        await this.setState({
            //[ name ]: value,
            txtActivity: txtActivity,
        });
    }

    handleImageChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            selectedFile: event.target.files[0]
        })
    }

    submitForm = async (event) => {
        const { history } = this.props;
        const { txtActivity } = this.state;

        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        if (isEmpty(txtActivity)) {
            alert("Activity can't be blank !!");
            return;
        }
        else{

            const response =await userService.addActivity(localStorage.getItem("userId") ,txtActivity ,{id:localStorage.getItem("userId")} ,
                this.state.selectedFile);
            window.location.reload(false);
        }
    };

    render() {
        const {userName , groups,txtActivity,file,userCreationDate} = this.state;


            const groupList = groups.map(group => {
           var creationdate=group.creationdate;
           var dateTimeSplit = creationdate.split('T');
           var dateSplit = dateTimeSplit[0];
           var timeSplit = dateTimeSplit[1];
           const post="posted "+dateSplit + " " +timeSplit;
           //let imageBlob= userService.getImage();
           //const url = URL.createObjectURL(imageBlob);

           //var arrayBufferView = new Uint8Array( this.response );
           //var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
           //var urlCreator = window.URL || window.webkitURL;
           //var imageUrl ='data:image/jpeg;base64,{imageBlob}';


           //let source =URL.createObjectURL(new Blob(imageBlob, {type: "application/zip"})); //'require(./ProfilePicture/' + group.filename + ")";*/}
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
            <main className="dashboard-mp">

                {/*<div className="dash-todo-thumbnail-area1">*/}
                    {/*<div className="todo-thumb1 dash-bg-image1 dash-bg-overlay"></div>*/}
                    {/*<div className="dash-todo-header1">*/}
                        {/*<div className="container">*/}
                            {/*<div className="row">*/}
                                {/*<div className="col-lg-12 col-md-12">*/}
                                    {/*<div className="my-profile-dash">*/}
                                        {/*<div className="my-dp-dash">*/}
                                            {/*<img src="images/my-dashboard/my-dp.jpg" alt=""/>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}

                <div className="dash-dts">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="event-title">
                                    <div className="my-dash-dt">
                                        <h3>{userName}</h3>
                                        <span id="lblUseMemberSince">{userCreationDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <ul className="right-details">
                                    <li>
                                        <div className="my-all-evnts">
                                            <a href="my_dashboard_events.html">View Events</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="all-dis-evnt">
                                            <div className="dscun-txt">Events</div>
                                            <div className="dscun-numbr">22</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="all-dis-evnt">
                                            <div className="dscun-txt">Discussions</div>
                                            <div className="dscun-numbr">40</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="dash-tab-links">
                    <div className="container">
                        <div className="row">
                            {/*<div className="col-lg-12 col-md-12">*/}
                                {/*<ul className="nav nav-tabs">*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link active" href="my_dashboard_activity.html">Activity</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" href="my_dashboard_about.html">About</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" href="my_dashboard_discussions.html">Discussions</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" href="my_dashboard_events.html">Events</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" href="my_dashboard_followers.html">Followers <span className="badge badge-alrts">20</span></a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" href="my_dashboard_following.html">Following <span className="badge badge-alrts">20</span></a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" href="my_dashboard_messages.html">Messages <span className="badge badge-alrts">2</span></a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" href="my_dashboard_credits.html">Credits</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" href="my_dashboard_booked_events.html">Booked Events</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" href="my_dashboard_history.html">History</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" href="my_dashboard_setting_info.html">Setting</a>*/}
                                    {/*</li>*/}
                                {/*</ul>*/}
                            {/*</div>*/}
                            <div className="col-lg-3 col-md-5">
                                <div className="user-data full-width">
                                    <div className="categories-left-heading">
                                        <h3>Social Accounts</h3>
                                    </div>
                                    <div className="categories-items">
                                        {/*<a className="category-social-item" href="#"><i className="fas fa-globe" style="color:#51a5fb;"></i>www.example.com</a>*/}
                                        {/*<a className="category-social-item" href="#"><i className="fab fa-facebook-square" style="color:#3b5998;"></i>http://www.facebook.com</a>*/}
                                        {/*<a className="category-social-item" href="#"><i className="fab fa-twitter" style="color:#1da1f2;"></i>http://www.twitter.com</a>*/}
                                        {/*<a className="category-social-item" href="#"><i className="fab fa-google-plus" style="color:#dd4b39;"></i>http://www.googleplus.com</a>*/}
                                        {/*<a className="category-social-item" href="#"><i className="fab fa-instagram" style="color:#405de6;"></i>http://www.instagram.com</a>*/}
                                        {/*<a className="category-social-item" href="#"><i className="fab fa-pinterest" style="color:#bd081c;"></i>http://www.pinterest.com</a>*/}
                                        {/*<a className="category-social-item" href="#"><i className="fab fa-linkedin" style="color:#0077b5;"></i>http://www.linkedin.com</a>*/}
                                        {/*<a className="category-social-item" href="#"><i className="fab fa-youtube" style="color:#ff0000;"></i>http://www.youtube.com/</a>*/}
                                    </div>
                                </div>

                                <div className="user-data full-width">
                                    <div className="categories-left-heading">
                                        <h3>People Viewed Profile</h3>
                                    </div>
                                    <div className="sugguest-user">
                                        <div className="sugguest-user-dt">
                                            <a href="#"><img src="images/homepage/left-side/left-img-1.jpg" alt=""/></a>
                                            <a href="#"><h4>Johnson</h4></a>
                                        </div>
                                        <button className="request-btn"><i className="fas fa-user-plus"></i></button>
                                    </div>
                                    <div className="sugguest-user">
                                        <div className="sugguest-user-dt">
                                            <a href="#"><img src="images/homepage/left-side/left-img-2.jpg" alt=""/></a>
                                            <a href="#"><h4>Jassica William</h4></a>
                                        </div>
                                        <button className="request-btn"><i className="fas fa-user-plus"></i></button>
                                    </div>
                                    <div className="sugguest-user">
                                        <div className="sugguest-user-dt">
                                            <a href="#"><img src="images/homepage/left-side/left-img-3.jpg" alt=""/></a>
                                            <a href="#"><h4>Rock</h4></a>
                                        </div>
                                        <button className="request-btn"><i className="fas fa-user-plus"></i></button>
                                    </div>
                                    <div className="sugguest-user">
                                        <div className="sugguest-user-dt">
                                            <a href="#"><img src="images/homepage/left-side/left-img-4.jpg" alt=""/></a>
                                            <a href="#"><h4>Davil Smith</h4></a>
                                        </div>
                                        <button className="request-btn"><i className="fas fa-user-plus"></i></button>
                                    </div>
                                    <div className="sugguest-user">
                                        <div className="sugguest-user-dt">
                                            <a href="#"><img src="images/homepage/left-side/left-img-5.jpg" alt=""/></a>
                                            <a href="#"><h4>Ricky Doe</h4></a>
                                        </div>
                                        <button className="request-btn"><i className="fas fa-user-plus"></i></button>
                                    </div>
                                </div>


                            </div>


                <div className="col-lg-6 col-md-7">
                    <div className="main-posts">
                        <div className="add-activity">
                            <div className="activity-group">
                                <div className="maine-activity-img">
                                    {/*<img src="http://localhost:5000/cat.jpeg" alt="" style={{width: 175, height: 175}}/>*/}
                                </div>

                                <textarea required id="txtActivity"
                                          value={txtActivity}
                                          onChange={ (e) =>{
                                              this.handleChange(e)
                                          }}
                                          className="add-activity-des" placeholder="What is new ?"></textarea>



                            </div>

                            <div>

                                <img src={this.state.file}  className="img-fluid w-100"/>
                                <input type="file" className="form-control" name="file" onChange={this.handleImageChange}/>
                            </div>

                            <div className="activity-button">
                                <button className="act-btn-post" type="submit" id="submitActivityBtn"
                                        onClick={this.submitForm}>Upload Activity</button>
                            </div>
                        </div>


                        <div id="lstActivity">
                            {groupList}
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


export default MyDashboardActivity;

