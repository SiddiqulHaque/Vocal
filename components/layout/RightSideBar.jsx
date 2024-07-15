"use client";
import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import UserCard from "@components/cards/UserCard";
import axios from "axios";
import Loader from "@components/Loader";
const RightSideBar = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchedPeople, setSearchedPeople] = useState([]);

  const getSearchedPeople = async () => {
    const response = await fetch(`/api/user/search/${search}`);
    const data = await response.json();
    setSearchedPeople(data);
    setLoading(false);
  };
  const getinitialPeople = async () => {
    try {
      await axios.get("/api/people").then((res) => {
        console.log(res.data);
        setSearchedPeople(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getinitialPeople();
  }, []);
  useEffect(() => {
    if (search.length == 0) {
      getinitialPeople();
    }
    getSearchedPeople();
  }, [search]);
  return loading ? (
    <Loader />
  ) : (
    <div className="sticky right-0 top-0 z-20 h-screen w-[300px] xl:w-[350px] flex flex-col gap-12 overflow-auto pl-6 pr-10 py-6 max-lg:hidden custom-scrollbar">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            className="search-bar"
            placeholder="Search People"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="search-icon" onClick={() => getSearchedPeople()} />
        </div>
        <div className="font-bold    ">
          <h1 className="">Suggested People</h1>
        </div>
        {searchedPeople?.map((person) => (
          <>
            <UserCard
              key={person.id}
              userData={person}
              update={getSearchedPeople}
            />
            <p>user</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
