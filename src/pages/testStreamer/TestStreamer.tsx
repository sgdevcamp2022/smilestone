import {Device} from "mediasoup-client";
import {io} from "socket.io-client";
import {
  Level4_1,
  ProfileConstrainedHigh,
  ProfileHigh,
  profileLevelIdToString,
  ProfileMain
} from "h264-profile-level-id";
import {useState} from "react";
import ReactPlayer from "react-player";

const socket = io("43.200.154.60:3000/mediasoup")

const TestStreamer = () => {
  const [streamer, setStreamer] = useState<string>("test")
  const [testStream, setTestStream] = useState<MediaStream>()

  const onClickStream = () => {
    navigator.mediaDevices.getDisplayMedia({
      video: {
        width: {
          max: 1280,
          ideal: 1280,
        },
        height: {
          max: 720,
          ideal: 720,
        }
      },
      audio: true
    }).then(stream => {
      setTestStream(stream)
      const track = stream.getVideoTracks()[0]

      const device : Device = new Device()
      socket.emit("start-and-get-rtpCapabilities", streamer, async (data : any) => {
        await loadDevice(device, data)
        if(device.canProduce("video")) {
          socket.emit("create-webRTC-transport", streamer, async ({params} : any) => {
            if (params.error) {
              console.log(params.error)
              return
            }
            const producerTransport = device.createSendTransport(params)
            producerTransport.on("connect", async ({dtlsParameters}, callback, errback) => {
              try {
                socket.emit("send-transport-connect", streamer, {dtlsParameters})
                callback()
              } catch (error) {
                // @ts-ignore
                errback(error)
              }
            })

            producerTransport.on("produce", async (parameters, callback, errback) => {
              try {
                socket.emit("transport-produce", streamer, {
                  transportId: producerTransport.id,
                  kind: parameters.kind,
                  rtpParameters: parameters.rtpParameters,
                  appData: parameters.appData
                }, ({id} : any) => {
                  callback({id})
                })
              } catch (error : any) {
                errback(error)
              }
            })

            const producer = await producerTransport.produce({
              track       : track,
              encodings   :
                [
                  { maxBitrate: 900000 }
                ],
              codecOptions :
                {
                  videoGoogleStartBitrate : 400000
                },
              codec: {
                kind: "video",
                mimeType: "video/H264",
                clockRate: 90000,
                parameters: {
                  "packetization-mode"      : 1,
                  "profile-level-id"        : profileLevelIdToString({
                    level: Level4_1,
                    profile: ProfileHigh
                  }),
                  "level-asymmetry-allowed" : 1
                }
              }
            })
            producer.on('trackended', () => {
              console.log('track ended')
              // close video track
            })

            producer.on('transportclose', () => {
              console.log('transport ended')
              // close video track
            })
          })
        } else {
          console.log("FUFUFFFFFFFFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCCCCCCCCCCCCCCCKKKKKKKKKK")
        }
      })
    })
  }

  async function loadDevice(device : Device, data : any) {
    console.log("asdfasdf", data.rtpCapabilities)
    await device.load({
      routerRtpCapabilities: data.rtpCapabilities
    })

    if(!device.canProduce("video")) {
      console.warn("cannot produce video")
    }
  }
  return (
    <>
      <button onClick={onClickStream}>방송시작</button>
      {
        testStream ?
          <ReactPlayer controls={true} width={"100%"} height={"830px"} url={testStream} /> :
          <div>방송 시작 버튼을 눌러 주세요!</div>
      }
    </>
  );
};

export default TestStreamer;