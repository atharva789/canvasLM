from fastapi import FastAPI
import uvicorn

def init_app():
    app = FastAPI(
        title = "FastAPI backend",
        description="FastAPI Prisma",
        version="1.0.0"
    ) 

    @app.on_event("startup")
    async def startup():
        print("Start Server")
    

    @app.on_event("shutdown")
    async def shutdown():
        print("Shutdown Server")


    @app.get("/")
    def home():
        return "Welcome Home!"

    return app


app = init_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8888, reload=True)
    