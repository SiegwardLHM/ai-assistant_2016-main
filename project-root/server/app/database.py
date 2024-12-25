from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

# MySQL连接URL - 使用你的chatdb数据库配置
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:root@localhost/chatdb"

# 创建数据库引擎
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 创建基础模型类
Base = declarative_base()

# 获取数据库会话的依赖函数
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 在现有代码后添加测试函数
def test_connection():
    try:
        # 尝试创建连接
        db = SessionLocal()
        # 使用 text() 包装 SQL 查询
        db.execute(text("SELECT 1"))
        print("数据库连接成功！")
        return True
    except Exception as e:
        print(f"数据库连接失败：{str(e)}")
        return False
    finally:
        db.close()

# 如果直接运行此文件，测试连接
if __name__ == "__main__":
    test_connection()