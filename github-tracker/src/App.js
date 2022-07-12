import React, { useState } from "react";
import RepoDetails from "./RepoDetails";
import "./App.css";
import { getAllRepos, getDetailsFromAxios, getUserInfo } from "./Axios";

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [htmlurl, setHtmlurl] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [login, setLogin] = useState("");
  const [publicRepos, setPublicRepos] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await getAllRepos(username);
    setLoading(false);
    setRepos(data);
    const userData = await getUserInfo(username);
    setAvatar(userData.avatar_url);
    setHtmlurl(userData.html_url);
    setFollowers(userData.followers);
    setFollowing(userData.following);
    setLogin(userData.login);
    setPublicRepos(userData.public_repos);
  }

  function renderRepo(repo) {
    return (
      <div
        className="row"
        onClick={() => getDetails(repo.name, username)}
        key={repo.id}
      >
        <h2 className="repo-name">{repo.name}</h2>
      </div>
    );
  }

  async function getDetails(repoName) {
    setDetailsLoading(true);
    const data = await getDetailsFromAxios(repoName, username);
    setDetailsLoading(false);
    setDetails(data);
  }

  return (
    <div className="page" role="wrapper">
      <div className="landing-page-container">
        <div className="left-side">
          <div id="user-info">
            <img id="avatar" src={avatar} />

            <label className="label">HTML url:</label>
            <span>{htmlurl}</span>

            <label className="label">Followers:</label>
            <p>{followers}</p>

            <label className="label">Following:</label>
            <p>{following}</p>

            <label className="label">Login:</label>
            <p>{login}</p>

            <label className="label">Public Repos:</label>
            <p>{publicRepos}</p>
          </div>

          <div>
            <form className="form">
              <input
                className="input"
                value={username}
                placeholder="Github Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="button" onClick={handleSubmit}>
                {loading ? "Searching..." : "Search"}
              </button>
            </form>
          </div>
          <div className="results-container">{repos.map(renderRepo)}</div>
        </div>
        <RepoDetails details={details} loading={detailsLoading} />
      </div>
    </div>
  );
}

export default App;
