import pymysql;
import MySQLdb.cursors;
import json;
from django.http import HttpResponse,Http404


def saveData(request):
    
	conn=pymysql.connect(host="localhost",user="root",passwd="sonu1995",db="heatmap",cursorclass=MySQLdb.cursors.DictCursor);
	cursor=conn.cursor();

	element = request.GET.get("Element")
	left = request.GET.get("Left")
	top = request.GET.get("Top")
	count = request.GET.get("Count")

	
	query = 'select * from clickmap where element="'+ element+'" and topDis="'+top+'" and leftDis="'+left+'" ';
	query=str(query);
	cursor.execute(query)
	row = cursor.fetchone()
	if row is not None:

		count=row['count'] 
		top=row['topDis']
		count=int(count);
		count=count+1;
		sql= 'update clickmap set count="'+str(count) +'" where topDis="'+top+'";';
		cursor.execute(sql)
		conn.commit();

	else:

		sql= "INSERT INTO clickmap (topDis,leftDis,element,count) VALUES ('%s','%s','%s','%s')" % (top,left,element,count);
		cursor.execute(sql)
		conn.commit();

	conn.close();

	return HttpResponse(json.dumps({"status": 1}), content_type="application/json")

def getData(request):

	conn=pymysql.connect(host="localhost",user="root",passwd="sonu1995",db="heatmap",cursorclass=MySQLdb.cursors.DictCursor);
	cursor=conn.cursor();
	elements=[]

	query = 'select * from clickmap';
	query=str(query);
	cursor.execute(query)
	rows = cursor.fetchall()
	for row in rows:

		count=row['count'] 
		top=row['topDis']
		left=row['leftDis']
		element=row['element']

		obj={

			'Element':element,
			'Top':top,
			'Left':left,
			'Count':count
		}

		elements.append(obj);
		
	conn.close();

	return HttpResponse(json.dumps(elements), content_type="application/json");

def checkUser(request):

	userStatus=request.user.is_superuser;
	return HttpResponse(json.dumps(userStatus), content_type="application/json");


