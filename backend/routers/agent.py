import weaviate
from weaviate.classes.config import Configure, Property, DataType, Multi2VecField

weaviate_client = weaviate.connect_to_local()

module_materials = {
  "class": "Material",
  "description": "A class material PDF",
  "vectorizer": "text2vec-openai",
  "properties": [
    Property(name="moduleName", data_type=DataType.TEXT, description="The Module name"),
    Property(name="fileName", data_type=DataType.TEXT, description="The file URL"),
    Property(name="text", data_type=DataType.TEXT, description="The file text"),
  ]
}

# Create the class
weaviate_client.schema.create_class(schema)
print("Class 'Material' created!")
