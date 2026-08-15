// Student Number: 

const { useState, useRef } = React;

// ==========================
// Supplied Data
// Do not modify this section
// ==========================

const posts = [
    {
        id: 1,
        username: "@sarah",
        caption: "Studying React today!",
        status: "Published"
    },
    {
        id: 2,
        username: "@john",
        caption: "Finished Practical 3.",
        status: "Draft"
    },
    {
        id: 3,
        username: "@amy",
        caption: "Coffee before coding.",
        status: "Published"
    },
    {
        id: 4,
        username: "@michael",
        caption: "Working on Assignment 2.",
        status: "Archived"
    },
    {
        id: 5,
        username: "@leanne",
        caption: "Sunset over campus.",
        status: "Published"
    }
];

// ==========================
// React Components
// Write your components below
// ==========================

function App() {
    let [allPosts, setPosts] = useState(posts);// this contains all posts new and all
    let [search, setSearch] = useState(posts);

    let inputSearch = useRef(0);
    let inputUsername = useRef(0);
    let inputCaption = useRef(0);
    let sortUser = (asc_desc)=>{
        let order="";
        let sortedArrUserName = [...search].sort((obj1, obj2) => {
            let objA = obj1.username.toLowerCase();
            let objB = obj2.username.toLowerCase();
            if (asc_desc) {
                order = "ASC";
                if (objA < objB) return -1;
                if (objA > objB) return 1;
                return 0;
            } else {
                order = "DESC";
                if (objB < objA) return -1;
                if (objB > objA) return 1;
                return 0;
            }
        });
        setSearch(sortedArrUserName);
        setPosts(sortedArrCapp);
        return order;
    }
    let sortCapp = (asc_desc)=>{
        let order = "";
        let sortedArrCapp = [...search].sort((obj1, obj2) => {
            let objA = obj1.caption.toLowerCase();
            let objB = obj2.caption.toLowerCase();
            if (asc_desc) {
                order = 'ASC';
                // Use comparison operators for strings
                if (objA < objB) return -1;
                if (objA > objB) return 1;
                return 0;
            } else {
                order = "DESC";
                // Reverse comparison for descending
                if (objB < objA) return -1;
                if (objB > objA) return 1;
                return 0;
            }
        });
        setSearch(sortedArrCapp);
        setPosts(sortedArrCapp);
        return order;
    }
    let performSearch = e=>{
        e.preventDefault();
        if(inputSearch.current.value === ""){
            setSearch(allPosts);
            return;
        }
            
        let newFilter = allPosts.filter((obj)=>{
            if((obj.username).includes(inputSearch.current.value) || (obj.caption).includes(inputSearch.current.value))
                return obj;
        });
        setSearch(newFilter);
    };
    let validateInput_AddPost = (statusText)=>{
        let userTxt = inputUsername.current.value.trim();
        let capTxt = inputCaption.current.value.trim();
        if(userTxt=="" || capTxt=="")
            return;
        let userName = "";
        capTxt = inputCaption.current.value;
        if(!inputUsername.current.value.includes("@"))
            userName = "@"+inputUsername.current.value;
        else 
            userName = inputUsername.current.value;

        let newArr = [...allPosts,{
            id:allPosts.length+1,
            username: userName,
            caption: capTxt,
            status: "Draft"
        }];
        setPosts(newArr);
        setSearch(newArr);
        inputSearch.current.value = "";
        inputCaption.current.value = "";
        inputUsername.current.value = "";
    }
    let deletePost = (i)=>{
        let array = [...allPosts];
        //console.log(i);
        if(i<0)
            return;
        array.splice(i,1);

        setPosts(array);
        setSearch(array);
        inputSearch.current.value = "";
        inputCaption.current.value = "";
        inputUsername.current.value = "";

    }
    return (
        <div className="app">
            <h1>PhotoShare Manager</h1>
            <SearchBar refInputSearch={inputSearch} search={performSearch}/>
            <br/>
            <SortThePost sortUsers={sortUser} sortCapps={sortCapp}/>
            <AddNewPost valid={validateInput_AddPost} refUname={inputUsername} refCap={inputCaption}/>
            <br/>
            <hr/>
            <br/>
            <h2>Posts:</h2>
            <PostList  posts={search} deleteApost={deletePost}/>
        </div>
    );
}
//____________________________APP_____________________________
function SearchBar(props){
    
    /*let search = (e)=>{
        e.preventDefault();
        console.log("HEy");
    }*/
    return(
        <form>
            <label>Search:</label>
            <input onChange={props.search} type="text" placeholder="Search by username or caption" ref={props.refInputSearch}/>    
        </form>
    );
}
function SortThePost(props){
    let [asc_descOrderUser, setOrderUser] = useState(false);
    let [asc_descOrderCapp, setOrderCapp] = useState(false);
    let orderUser = asc_descOrderUser?'ASC':'DESC';
    let orderCaption = asc_descOrderCapp?'ASC':'DESC';

    let sortU = ()=>{
        setOrderUser(!asc_descOrderUser);
        props.sortUsers(asc_descOrderUser);
    }
    let sortC = ()=>{
        setOrderCapp(!asc_descOrderCapp);
        props.sortCapps(asc_descOrderCapp);
    }

    return(
        <>
            <button onClick={sortU} className="orderBtn">Username:{orderUser}</button>
            <button onClick={sortC} className="orderBtn">Caption:{orderCaption}</button>
        </>
    )
}
function AddNewPost(props){
    let [status, setStatus] = useState("Draft");
    let [itt, setItt] = useState(0);

    /*let ittChange = (e)=>{
        e.preventDefault();
        let i = itt;
        i++;
        let stat = "";
        if(i==0)
            stat = "Draft";
        else if(i==1)
            stat = "Archived";
        else if(i==2)
            stat = "Published";
        else{
            i=0;
            stat = "Draft";
        }

        setItt(i);
        setStatus(stat);
    }*/
    let newPostAdded = (e)=>{
        e.preventDefault();
        props.valid(status);
    }
    return(
        <form onSubmit={newPostAdded} className="addPost">
            <h2>Add New Post</h2>
            <label name="newUser">Username: </label>
            <input type="text" placeholder="please enter your Username " ref={props.refUname}/>
            <label name="caption">Caption: </label>
            <textarea placeholder="please enter a caption for the post " ref={props.refCap}/>
            {/* <button onClick={ittChange}>{status}</button> */}
            <button onClick={newPostAdded}>Submit</button>
        </form>
    )
}
function PostList(props){
    let listPosts = null;
    if(props.posts && props.posts.length>0)
        listPosts = props.posts.map((post, index)=>{
            //console.log(index);
            return(
                <PostCard obj={post} key={post.id} indexKey={index} deleteFun={props.deleteApost}/>
            )
        });
    //console.log("--------------------------------------------");
    let display = ()=>{
        if(listPosts)
            return listPosts;
        else
            return (<h2>No posts found.</h2>)
    }
    return(
        <>
            {display()}
        </>
    )
}
function PostCard(props){
    let allStat = ["Draft", "Published", "Archived"];
    let [itter,setItt] = useState(-1);
    
    let [status, toggleStat] = useState((props.obj.status));
    let statChange = (itt)=>{
        //console.log(itt);
        itt = (itt+1);
        if(itt >2){
            itt= (0);
        }
        setItt(itt);
        toggleStat(allStat[itt]);
    }
    let change= ()=>{statChange(itter)};

    return(
        <div className="postCard">
            <h2>{props.obj.username}</h2>
            <p>{props.obj.caption}</p>
            <button onClick={change} className="changeStat">{status}</button>
            <button onClick={()=>{props.deleteFun(props.indexKey)}} className="delete">Delete</button>
        </div>
    );
}

// ==========================
// Render the Application
// Do not modify this section
// ==========================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);