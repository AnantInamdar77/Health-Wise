import sys
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import OpenAI
from langchain.document_loaders import MongoDocumentLoader
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings  # Import the embedding class

def initialize_chatbot():
    # Load documents from MongoDB
    loader = MongoDocumentLoader("mongodb://localhost:27017/healthwise", "knowledge_base")
    documents = loader.load()
    
    # Create an embedding model instance
    embedding_model = OpenAIEmbeddings(model="text-embedding-ada-002")  # Use a specific embedding model
    
    # Create a FAISS vector store from the loaded documents using the embedding model
    vectorstore = FAISS.from_documents(documents, embedding_model)
    
    # Initialize the language model
    llm = OpenAI(model="gpt-3.5-turbo")
    
    # Create a conversational retrieval chain
    chatbot = ConversationalRetrievalChain(llm=llm, retriever=vectorstore.as_retriever())
    
    return chatbot

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <query>")
        sys.exit(1)

    query = sys.argv[1]
    chatbot = initialize_chatbot()
    
    # Run the chatbot with the provided query and an empty chat history
    response = chatbot.run({"question": query, "chat_history": []})
    
    # Print the response from the chatbot
    print(response)
