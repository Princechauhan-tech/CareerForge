import bcrypt from "bcryptjs";

const password = "Prince@123";

const run = async() => {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Original Password:", password);
    console.log("Hashed Password:", hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);

    console.log("Password Match:", isMatch);
};

run();