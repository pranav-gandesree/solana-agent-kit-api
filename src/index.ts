import express, { Request, Response } from "express";
import cors from "cors";
import { runChat } from "./interact.ts";


const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));


app.get("/api/test", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});



app.post("/api/checkbalance", async (req: any, res: any) => {
  try {
    const { message } = await req.body;
    console.log('Received request body:', req.body);

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log('Processing message:', message);
    const response = await runChat(message);
    console.log('Response from runChat:', response); 

    return res.json({ response });
  } catch (error) {
    console.error("Error in /api/checkbalance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
