import React from 'react'

const Card = React.memo(({ name, image, position, biography }) => {
    console.log('reinderizzato');

    return (
        <>
            <div className='card col-4'>

                <h2>{name}</h2>
                <img src={image || "https://picsum.photos/200/300"}
                    alt={name}
                    onError={(e) => {
                        e.target.src = "https://picsum.photos/200/300"
                    }} />
                <p>{position}</p>
                <p>{biography}</p>

            </div>
        </>
    )

})

export default Card