import React, { Component } from 'react'
import items from './data'


const RoomContext = React.createContext()

export default class RoomProvider extends Component {
    state={
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true
    };
    // getDate
    componentDidMount(){
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured === true)
        this.setState({
            rooms, featuredRooms, sortedRooms:rooms, loading:false
        })
    }

    formatData(items){
        let tempItems = items.map(items => {
            let id = items.sys.id
            let images = items.fields.images.map(image => image.fields.file.url);

            let room = {...items.fields, images, id}
            return room
        })
        return tempItems
    }






    render() {
        return (
            <RoomContext.Provider value={{...this.state }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext};