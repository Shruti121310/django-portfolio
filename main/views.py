from django.http import request
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ContactMessage, Project, Skill 
from django.core.mail import send_mail


def home(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        send_mail(
        subject=f'[Portfolio Contact] {subject}',
         message=f'Name: {name}\nEmail: {email}\n\nMessage:\n{message}',
        from_email=None,
         recipient_list=['2003riraru@gmail.com'],
        )

        messages.success(request, 'Your message has been sent successfully!')

        return redirect('/#contact')

    projects = Project.objects.order_by('-created_at')

    skills = Skill.objects.all()

    return render(request, 'main/index.html', {
        'projects': projects,
        'skills': skills
    })