from django.db import models


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.subject}"


class Project(models.Model):
    title = models.CharField(max_length=200)
    project_type = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_link = models.URLField(blank=True)
    live_link = models.URLField(blank=True)
    technologies = models.CharField(max_length=300, blank=True)
    bank_link = models.URLField(blank=True)
    cgpa_link = models.URLField(blank=True)
    login_link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    @property
    def technology_list(self):
        return [tech.strip() for tech in self.technologies.split(',') if tech.strip()]
    
    def __str__(self):
        return self.title

class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True)
    is_learning = models.BooleanField(default=False)

    def __str__(self):
        return self.name