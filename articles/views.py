from django.shortcuts import render, get_object_or_404 
from django.views import generic, View
from .models import Article
from django.views.decorators.csrf import csrf_exempt
from .forms import CommentForm

@csrf_exempt
def index(request):
    articles = Article.objects.all().order_by('-created_on')
    context = {
        'article_list': articles,
    }
    
    return render(request, 'index.html', context)

def article_detail(request, slug):
    article = get_object_or_404(Article, slug=slug)
    return render(request, 'article_detail.html', {'article': article})

class ArticleList(generic.ListView):
    model = Article
    queryset = Article.objects.filter(status=1).order_by('-created_on')
    template_name = 'index.html'
    paginate_by = 6
    
class ArticleDetail(View):
    # 
    def get(self, request, slug, *args, **kwargs):
        queryset = Article.objects.filter(status=1)
        article = get_object_or_404(queryset, slug=slug)
        comments = article.comments.filter(approved=True).order_by('created_on')
        liked = False
        if article.likes.filter(id=self.request.user.id).exists():
            liked = True

        return render(
            request,
            "article_detail.html",
            {
                "article": article,
                "comments": comments,
                "commented": False,
                "liked": liked,
                "comment_form": CommentForm()
            },
        )
        
        
    def post(self, request, slug, *args, **kwargs):
        queryset = Article.objects.filter(status=1)
        article = get_object_or_404(queryset, slug=slug)
        comments = article.comments.filter(approved=True).order_by('created_on')
        liked = False
        if article.likes.filter(id=self.request.user.id).exists():
            liked = True

        comment_form = CommentForm(data=request.POST)
        
        if comment_form.is_valid():
            comment_form.instance.email = request.user.email
            comment_form.instance.name = request.user.username
            comment = comment_form.save(commit=False)
            comment.article = article
            comment.save()
            commented = True
        else:
            commented = False

        return render(
            request,
            "article_detail.html",
            {
                "article": article,
                "comments": comments,
                "commented": commented,
                "liked": liked,
                "comment_form": CommentForm()
            },
        )