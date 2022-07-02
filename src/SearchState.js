import { fromFetch } from "rxjs/src/fetch";
import { BehaviorSubject, of, concat } from "rxjs";
import {
  throttleTime,
  switchMap,
  catchError,
  filter,
  find,
  map
} from "rxjs/operators";

import { useEffect, useMemo, useState } from "react";

export const useSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const change$ = new BehaviorSubject("").pipe(throttleTime(500));
  const result$ = fromFetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .pipe(
      switchMap((response) => {
        if (response.ok) {
          // OK return data
          return response.json();
        } else {
          // Server is returning a status requiring the client to try something else.
          return of({ error: true, message: `Error ${response.status}` });
        }
      }),
      catchError((err) => {
        // Network or other error, handle appropriately
        console.error(err);
        return of({ error: true, message: err.message });
      })
    )
    .pipe(map((value) => value.results));

  useEffect(() => {
    console.log("aaa");
    const sub = change$.subscribe();

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const filterArray = results.filter((item) => {
      console.log("item: ", item);
      return item.name.includes(searchText);
    });
    setDisplayArray(filterArray);
  }, [results]);

  const handleSearchChange = (e) => {
    change$.next(setSearchText(e));

    result$.subscribe(setResults);
  };

  return { searchText, handleSearchChange, displayArray };
};
