import React, { memo } from "react";
import { ICat } from "../interfaces/catServiceInterfaces";

/**
 * Cat
 * Cat image and list of its breeds
 * memo - avoid unnecessary rerendering when scrolling
 */
const Cat = memo((cat: ICat) => {
    return (
        <div className="cat" >
            <img src={cat.url} className="grid-item-image" alt={`Cat image ${cat.id}`}/>
            <div className="grid-item-details" data-testid={`cat-breeds-${cat.id}`}>
                {cat.breeds?.map((breed) => {
                    return (
                        <span key={`cat-image-${cat.id}-breed-${breed.id}`} >{breed.name}</span>
                    )
                })
                }
            </div>
        </div>
    )
})

export default Cat;