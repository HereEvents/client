import EmptySearch from "../EmptySearch";
import EventCard from "../EventCard";
import styles from "./style.module.css";

function ContainerCard({events , nextPage, loadMore, searchMode, isAdvancedSearch}) {
 
  return (
    <>
    {(searchMode.event === "noResult"&&searchMode.food === "noResult"&&searchMode.attraction === "noResult") ? (
          <EmptySearch />
      ):<>
      <EventCard
      events={events.event}
      nextPage={nextPage.event}
      loadMore={loadMore}
      searchMode={searchMode.event}
      id = "event"
      />
      <EventCard
      events={events.food}
      nextPage={nextPage.food}
      loadMore={loadMore}
      searchMode={searchMode.food}
      title = "אוכל עם אוירה"
      id = "food"
      />
      <EventCard
      events={events.attraction}
      nextPage={nextPage.attraction}
      loadMore={loadMore}
      searchMode={searchMode.attraction}
      title = "אטרקציות בהזמנה אישית"
      id = "attraction"
      />
      </>}
      {((nextPage.event&&!nextPage.food&&!nextPage.attraction)||(nextPage.food&&!nextPage.attraction)||(nextPage.attraction)||(isAdvancedSearch))?null:<div className={styles.loadButton}/>}
    </>
  );
}

export default ContainerCard;
