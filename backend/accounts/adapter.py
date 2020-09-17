from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        # user.last_name = data.get('last_name')
        user.name = data.get('name')
        user.gender = data.get('gender')
        user.birth_date = data.get('birth_date')
        # user.product_key = data.get('product_key')
        user.save()
        return user