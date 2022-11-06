import { useContext, useEffect } from "react";
import {useParams} from "react-router-dom";
import { ShareScreenButton } from "../components/ShareScreenButton";
import { VideoPlayer } from "../components/VideoPlayer";
import { PeerState } from "../context/peerReducer";
import { RoomContext } from "../context/RoomContext";

export const Room = () => {
    const {id} = useParams();
    const {ws, me, stream, peers, shareScreen} = useContext(RoomContext);

    useEffect(() => {
        if (me) ws.emit("join-room", {roomId:id, peerId: me._id});
    }, [id, me, ws]);

    return (
        <>
            Room id {id}

            <div className="grid grid-cols-4 gap-4">
                <VideoPlayer stream={stream} key={id}/>

                {Object.values(peers as PeerState).map((peer) => (
                    <VideoPlayer stream={peer.stream} key={id}/>
                ))}
            </div>

            <div className="fixed bottom-0 p-6 w-full flex justify-center ">
                <ShareScreenButton onClick={shareScreen}/>
            </div>
        </>
    )
}