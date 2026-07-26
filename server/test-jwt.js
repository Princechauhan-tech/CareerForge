import jwt from "jsonwebtoken";

const secretKey = "mysecretkey";

const token = jwt.sign({
        id: "12345",
        role: "Student",
    },
    secretKey, {
        expiresIn: "1h",
    }
);

console.log("Generated Token:");
console.log(token);

const decoded = jwt.verify(token, secretKey);

console.log("\nDecoded Data:");
console.log(decoded);