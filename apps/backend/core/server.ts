import type { Request, Response } from "express";
import { server } from './app';

const port = Number(process.env.PORT) || 3000;

server.get('/', (_req: Request, res: Response) => {
    res.send('hello');
})

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});