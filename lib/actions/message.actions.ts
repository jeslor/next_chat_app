"use server";
import { ConnectToDB } from "@/lib/mongoose";
import Message  from "@/lib/models/message.model";
import { uploadCloudinary } from "@/lib/helper/cloudinary";



export const newMessage = async ({senderId, receiverId, text, file}:{
    senderId:string,
    receiverId:string,
    text:string,
    file?:any
}) => {
    try {
        await ConnectToDB();
        let  image = {secure_url:""};
       if (file) {
         await uploadCloudinary(file, "message").then((result) => {
            if (result && 'secure_url' in result) {
                image = { secure_url: result.secure_url };
            } else {
                throw new Error("Invalid response from uploadCloudinary");
            }
        }).catch((error) => {         
            console.log(error);
            throw new Error("Error uploading image");
        });
       }
        const message = new Message({
            sender:senderId,
            receiver:receiverId,
            text,
            file:image.secure_url,
        });

        await message.save();
        const updatedMessage = await Message.findOne({_id:message._id}).populate("sender receiver");
        
       
        return JSON.parse(JSON.stringify({status:200, message: "Message Sent", data:updatedMessage}));
    } catch (error) {
        console.log(error);
        return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}));
    }
}

// export const getMessages = async (loggedInUserId:string, contactId:string) => {
//     try {
//         await ConnectToDB();
//         const messages = await Message.find({
//             $or:[
//                 {sender:loggedInUserId, receiver:contactId},
//                 {sender:contactId, receiver:loggedInUserId},
//             ]
//         }).populate("sender receiver");
//         return JSON.parse(JSON.stringify({status:200, message: "Messages Found", data:messages}));
//     } catch (error) {
//         console.log(error);
//         return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}));
        
//     }
// }

export const getMessages = async (loggedInUserId:string) => {
   try {
    const foundMessages = await Message.find({ $or: [{ sender: loggedInUserId }, { receiver: loggedInUserId }] })
    .populate("sender receiver")
    .sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify({status: 200, message: "Messages Found", data: foundMessages }));
   } catch (error) {
    return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}));
   }
}

export const getMostRecentMessage = async (loggedInUserId:string, contactId:string) => {
    try {
        await ConnectToDB();
        const messages = await Message.find({
            $or:[
                {sender:loggedInUserId, receiver:contactId},
                {sender:contactId, receiver:loggedInUserId},
            ]
        }).populate("sender receiver").sort({createdAt:-1}).limit(1);
        return JSON.parse(JSON.stringify({status:200, message: "Messages Found", data:messages}));
    } catch (error) {
        console.log(error);
        return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}));
        
    }
}

