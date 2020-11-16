import React from 'react'
import './card.styles.css'

export const Card = props => (
    <div className='card-container'>
        <img alt=''            
            src={ props.monster.sprites.front_default }
        />
        <h2> {props.monster.name} </h2>
        <p> { props.monster.types.map((type)  => (type.type.name)) } </p>
    </div>
)