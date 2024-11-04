import sys
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import OpenAI
from langchain.document_loaders import MongoDocumentLoader
from langchain.vectorstores import FAISS

def initialize_chatbot():
    loader = MongoDocumentLoader("mongodb://localhost:27017/healthwise", "knowledge_base")
    vectorstore = FAISS.from_documents(loader.load(), embedding_model="openai-embedding-model")
    llm = OpenAI(model="gpt-3.5-turbo")
    chatbot = ConversationalRetrievalChain(llm=llm, retriever=vectorstore.as_retriever())
    return chatbot

if __name__ == "__main__":
    query = sys.argv[1]
    chatbot = initialize_chatbot()
    response = chatbot.run({"question": query, "chat_history": []})
    print(response)
