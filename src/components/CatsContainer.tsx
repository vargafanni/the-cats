import React, { useCallback, useEffect, useState } from "react";
import { ICat } from "../interfaces/catServiceInterfaces";
import { getCatImages } from "../service/catService";
import logo from "../logo.svg";
import Cat from "./Cat";
import { Grid } from "@mui/material";

/**
 * CatsContainer
 * fetch cat images based on searched breeds with infinite scroll
 */
const CatsContainer = ({breeds}: {breeds:string}) => {
    const [cats, setCats] = useState<ICat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [noMore, setNoMore] = useState<boolean>(false);
  
    //show loading, fetch new cat images, update next page number 
    const fetchNewCats = useCallback(async () => {
      if (isLoading) return;
  
      setIsLoading(true);
    
      getCatImages(page,(newCats)=>setCats((prevCats)=> [...prevCats,...newCats]),setNoMore,breeds)
      
      setPage((prevPage) => prevPage + 1);
  
    }, [page, isLoading]);

    //On change of searchedBreeds init noMore flag and page and fetch cats according to new breeds
    useEffect(() => {
        const getData = async () => {
          setIsLoading(true);
          setNoMore(false);
          setPage(1);
          getCatImages(0,setCats,setNoMore,breeds);
        };
    
        getData();
      }, [breeds]);

      //Attach scroll handler to fetch new cat images if scrolled to bottom
      useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
              document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 20 && !noMore) {
              fetchNewCats();
            }
          };
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [fetchNewCats]);

      //After cats state is refreshed hide loading
      useEffect(()=>{
        setIsLoading(false);
      },[cats])

    return (
        <div>
            <Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={1} data-testid={'cats-container'}>
                {cats?.map((cat,index) => {
                    return (
                        <Grid item xs={1} sm={1} md={1} lg={1} key={`cat-grid-${cat.id}-${index}`}>
                            <Cat {...cat} />
                        </Grid>
                    )
                })}
            </Grid>
            {isLoading &&
                <div className="loader" data-testid={'cats-loader'}><img src={logo} className="loader-image" /></div>
            }
            {noMore &&
                <div className="no-more" data-testid={'no-more-cats'}>We couldn't find more cats for your search, please add more breeds or remove all breeds filter!</div>}
        </div>
    )
}

export default CatsContainer;