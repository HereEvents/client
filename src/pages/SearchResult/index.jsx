import { useState, useEffect, useContext } from "react";
import apiCalls from "../../function/apiCalls";
import style from "./style.module.css";
import headerContext from "../../context/headerContext";
import { translation } from "../SearchEvent/translation";
import ContainerCard from "../../components/ContainerCard";

export default function SearchResult({search}) {

  const [events, setEvents] = useState({event:[],food:[],attraction:[]});
  const [nextPage, setNextPage] = useState({event:undefined,food:undefined,attraction:undefined});
  const [searchMode, setSearchMode] = useState({event:"loading",food:"loading",attraction:"loading"});

  const { setHeader } = useContext(headerContext);

  setHeader(translation.advencedSearch);

  async function fetchEvents() {
    setSearchMode({ event: "loading", food: "loading", attraction: "loading" });
    const tags = ["event", "food", "attraction"];
    tags.forEach(async(tag)=> {
    let apiSingleEvents = await apiCalls("post", "/event/search", {
      page:nextPage,
      tag,
      ...search
    });
    let apiEvents = apiSingleEvents.event
    setEvents((Prev) => ({ ...Prev, [tag]: apiEvents }));
    setNextPage((Prev) => ({ ...Prev, [tag]: apiSingleEvents.nextPage }));
    if(apiEvents.length===0)
      setSearchMode((Prev) => ({ ...Prev, [tag]: "noResult" }));
    else {setSearchMode((Prev) => ({ ...Prev, [tag]: "isResult" }))}
    })}

    const fetchEventsNext = (e) => {
      setSearchMode((Prev) => ({ ...Prev, [e.target.id]: "loading" }));
      apiCalls("post", "/event/search", {
        page: nextPage[e.target.id],
        tag:e.target.id,
        ...search
      }).then((data) => {
        setEvents((prev) => ({...prev,[e.target.id]:prev[e.target.id].concat(data.event)}));
        setNextPage((Prev) => ({ ...Prev, [e.target.id]: data.nextPage }));
        if (data.event.length === 0)  setSearchMode((Prev) => ({ ...Prev, [e.target.id]: "noResult" }));
        else {
          setSearchMode((Prev) => ({ ...Prev, [e.target.id]: "isResult" }));
        }
      });
    };

  useEffect(() => {
    setSearchMode("loading")
    try {
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className={style.container}>
      <ContainerCard events={events} searchMode={searchMode} nextPage={nextPage} loadMore={fetchEventsNext} isAdvancedSearch= {true}/>
    </div>
  );
}