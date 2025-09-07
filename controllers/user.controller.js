import User from "../models/user.model.js";

// Generate unique 4-digit roomKey
const generateUniqueRoomKey = async () => {
  let key;
  let exists = true;

  while (exists) {
    key = Math.floor(1000 + Math.random() * 9000);
    const existingUser = await User.findOne({ roomKey: key });
    if (!existingUser) exists = false;
  }
  return key;
};

export const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).send("Username and email are required");
    }

    const roomKey = await generateUniqueRoomKey();

    // If user with this email exists, update; otherwise create
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ username, email, roomKey });
      await user.save();
    } else {
      user.roomKey = roomKey;
      user.username = username;
      await user.save();
    }

    // Redirect to room chat page (mounted under /room)
    return res.redirect(`/room/chat/${roomKey}`);
  } catch (err) {
    console.error("Error in createUser:", err);
    return res.status(500).send("Something went wrong");
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { username, email, roomKey } = req.body;
    if (!username || !email || !roomKey) {
      return res.status(400).send("Username, email and roomKey are required");
    }

    // Verify roomKey exists (someone created it earlier)
    const existingRoomOwner = await User.findOne({ roomKey: Number(roomKey) });
    if (!existingRoomOwner) {
      return res.status(404).send("Room not found");
    }

    // Upsert user record for this participant (associate to the roomKey)
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ username, email, roomKey: Number(roomKey) });
      await user.save();
    } else {
      user.roomKey = Number(roomKey);
      user.username = username;
      await user.save();
    }

    return res.redirect(`/room/chat/${roomKey}`);
  } catch (err) {
    console.error("Error in joinRoom:", err);
    return res.status(500).send("Something went wrong");
  }
};
