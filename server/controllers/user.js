import User from "../models/User.js";

// getting user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// getting user friends
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    // method of multiple api request to database
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Updating add and remove friends
export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    // check if friend id is included in user id
    if (user.friends.includes(friendId)) {
      // removing when friend is there from user as well as the friend
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // adding the friend
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(402).json({ err: err.message });
  }
};

// updating user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { occupation, location } = req.body;
    const imageUrl = req.file ? `assets/${req.file.filename}` : undefined;

    // Find existing user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    // Only update provided fields
    const updatedUserData = {
      occupation: occupation || user.occupation,
      location: location || user.location,
      picturePath: imageUrl || user.picturePath,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update user!", error: err.message });
  }
};
