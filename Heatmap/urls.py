from django.conf.urls import include, url,patterns
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = patterns('',

	#your urls
	url(r'admin/', include(admin.site.urls)),
	url(r'^$', 'Heatmap.views.home'),
	url(r'loginCustom/', 'Heatmap.views.loginCustom'),
	url(r'login/', 'Heatmap.views.login'),
	url(r'logout', 'Heatmap.views.logout'),
	
	#heatmap urls
	url(r'clickElements',  'heatmap.views.saveData'),
	url(r'getElements',  'heatmap.views.getData'),
	url(r'checkUser',  'heatmap.views.checkUser'),
)+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
    

