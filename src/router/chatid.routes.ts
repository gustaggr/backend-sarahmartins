import { FastifyInstance } from 'fastify';
import { CreateChatIdController } from '../controller/chatid/postChatIdController';
import { DeleteChatIdController } from '../controller/chatid/deleteChatIdController';

export async function chatIdRoutes(app: FastifyInstance) {
    const createChatId = new CreateChatIdController();
    const deleteChatId = new DeleteChatIdController();

    app.post('/chatid', createChatId.store.bind(createChatId));
    app.delete('/chatid', deleteChatId.delete.bind(deleteChatId));
}
