import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ChannelList from "../../components/Channel/ChannelList";
import ChannelDetail from "../../components/Channel/ChannelDetail";
import SearchComponent from "../../components/Search";
import Layout from "../../Layout/MyDash/Dashboard";
import axios from "axios";
import Cookies from "js-cookie";
import localStorage from "local-storage";

const Channel = () => {
  // 입장 채널
  const { auth, channelIn, setChannelIn, SERVER_URL } = useContext(AuthContext);

  //검색 키워드
  const [searchData, setSearchData] = useState("");
  // 채널 리스트
  const [channels, setChannels] = useState([]);
  // 채널 페이지
  const [page, setPage] = useState(1);

  // 검색 채널 리스트 (channels) 가져오기
  const token = Cookies.get("token");
  const config = {
    params: {
      _page: page,
      keyword: searchData,
    },
    headers: {
      Authorization: `jwt ${token}`,
    },
  };

  // 채널 들어간게 없으면 새로고침 때문일 수 있으니 확인하기
  const checkChannel = () => {
    const url = `${SERVER_URL}/rooms/check`;
    const handleSetChannelIn = (channel) => {
      setChannelIn(channel);
      localStorage.set("myChannel", channel);
    };
    axios
      .get(url, config)
      .then((res) => {
        handleSetChannelIn(res.data.data);
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };

  useEffect(() => {
    // if (!channelIn && localStorage.get("myChannel")) {
    //   setChannelIn(localStorage.get("myChannel"));
    // }
    if (!channelIn) {
      checkChannel();
    }
  }, [channelIn]);

  // 검색과 리스트 가져오는것
  const getChannels = (searchData) => {
    // searchData 써서 채널 이름 저거 들어가는거 가지고와
    // 이거 모델에 만들어야함
    const handleSetChannels = (getChannels) => {
      setChannels(getChannels);
    };
    axios
      .get(SERVER_URL + "/rooms", config)
      .then((res) => {
        // console.log(res);
        handleSetChannels(res.data.data);
      })
      .catch((err) => {
        // console.log("Channel 에러!!");
        // console.log(err.response);
      });
  };
  useEffect(() => getChannels(searchData), [searchData, page]);
  //

  // 채널 출입 다시 렌더링 해줘야할 듯
  // useEffect(() => {
  //   getChannels(); // 이거 다시...
  // }, [channelIn]);

  if (!auth) {
    return <Redirect to="/" />;
  } else {
    return (
      <Layout>
        {/* <SearchContext.Provider value={{ searchData, setSearchData }}> */}
        {!channelIn ? (
          <div>
            <SearchComponent
              searchData={searchData}
              setSearchData={setSearchData}
            />
            <ChannelList channels={channels} page={page} setPage={setPage} />
          </div>
        ) : (
          <ChannelDetail channel={channelIn} />
        )}
        {/* </SearchContext.Provider> */}
      </Layout>
    );
  }
};

export default Channel;
