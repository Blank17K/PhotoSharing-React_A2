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
    let sortUser = (asc_desc)=>{
        let order="";
        let sortedArrUserName = [...search].sort((obj1, obj2) => {
            if (asc_desc) {
                order = "ASC";
                if (obj1.username < obj2.username) return -1;
                if (obj1.username > obj2.username) return 1;
                return 0;
            } else {
                order = "DESC";
                if (obj2.username < obj1.username) return -1;
                if (obj2.username > obj1.username) return 1;
                return 0;
            }
        });
        setSearch(sortedArrUserName);
        return order;
    }
    let sortCapp = (asc_desc)=>{
        let order = "";
        let sortedArrCapp = [...search].sort((obj1, obj2) => {
            if (asc_desc) {
                order = 'ASC';
                // Use comparison operators for strings
                if (obj1.caption < obj2.caption) return -1;
                if (obj1.caption > obj2.caption) return 1;
                return 0;
            } else {
                order = "DESC";
                // Reverse comparison for descending
                if (obj2.caption < obj1.caption) return -1;
                if (obj2.caption > obj1.caption) return 1;
                return 0;
            }
        });
        setSearch(sortedArrCapp);
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
    return (
        <div className="app">
            <h1>PhotoShare Manager</h1>
            <SearchBar refInputSearch={inputSearch} search={performSearch}/>
            <SortThePost sortUsers={sortUser} sortCapps={sortCapp}/>
            <AddNewPost />
            <hr/>
            <PostList  posts={search}/>
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
            <button onClick={sortU}>Username:{orderUser}</button>
            <button onClick={sortC}>Caption:{orderCaption}</button>
        </>
    )
}
function AddNewPost(props){

    return(
        <form>
            <h2>Add New Post</h2>
            <label name="newUser">Username: </label>
            <input type="text" placeholder="please enter your Username "/>
        </form>
    )
}
function PostList(props){
    let listPosts = null;
    if(props.posts && props.posts.length>0)
        listPosts = props.posts.map((post)=>{
            return(
                <PostCard obj={post} key={post.id} indexKey={post.id} />
            )
        });
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
        <>
            <h2>{props.obj.username}</h2>
            <p>{props.obj.caption}</p>
            <button onClick={change}>{status}</button>
            <button onClick={()=>{console.log(props.indexKey)}}>Delete</button>
        </>
    );
}

// ==========================
// Render the Application
// Do not modify this section
// ==========================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);