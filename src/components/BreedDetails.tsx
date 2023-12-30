import React, { memo } from "react";
import { IBreed } from "../interfaces/catServiceInterfaces";
/**
 * BreedDetail
 * additional info about a breed
 * memo -> when added a new breed as a selected the existing ones don't rerender
 */
const BreedDetail = memo(({breed}: {breed: IBreed})=>{
    return (
        <div className='breed' key={`breed-details-${breed.id}`}>
            <h3>{breed.name}</h3>
            <div>{breed.description}</div>
            <div>Temperament: {breed.temperament}</div>
            <div>Origin: {breed.origin}</div>
        </div>
    )
})
/**
 * BreedDetailsContainer
 * details about each searched breed
 */
const BreedDetailsContainer = ({ breeds }: { breeds?: IBreed[] }) => {
    return (
        <div className='breeds-details' data-testid={"breed-details-container"}>
            {breeds?.map((breed) => {
                return (
                    <BreedDetail breed={breed} key={`breed-details-${breed.id}`}/>
                )
            })}
        </div>
    )
}

export default BreedDetailsContainer;