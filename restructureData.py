import pandas as pd
import json
import os
import calendar


df = pd.read_csv('/Users/harshzota/Downloads/precip.csv')

grouped = df.groupby(['Community', 'P.month', 'P.year']).agg({'P.total_mm': 'sum'}).reset_index()

communities_data = {}

for _, row in grouped.iterrows():
    community = row['Community']
    month_num = row['P.month']
    year = row['P.year']
    value = row['P.total_mm']
    
    if community not in communities_data:
        communities_data[community] = {"community": community, "data": []}
    
    month_name = calendar.month_name[month_num]
    
    month_entry = next((item for item in communities_data[community]["data"] if item["month"] == month_name), None)
    if month_entry is None:
        month_entry = {"month": month_name, "values": [{}]}
        communities_data[community]["data"].append(month_entry)
    
    month_entry["values"][0][str(year)] = value

output_dir = '/Users/harshzota/Desktop/Dev/NicaAgua-Backend/precip'
os.makedirs(output_dir, exist_ok=True)

for community, data in communities_data.items():
    file_path = os.path.join(output_dir, f"{community}.json")
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)

print("JSON files have been created and saved locally.")
