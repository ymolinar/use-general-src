# -*- coding: utf-8 -*-
from faker import Faker
from odoo import models


class FakeModel(models.TransientModel):
    _name = 'data.fake'
    _description = 'Data Fake Creator'

    _instance = None

    def _fake(self, locale='es_MX'):
        if not self._instance:
            self._instance = Faker(locale)
        return self._instance

    def get_fake(self, action='sentence'):
        if 'street' == action:
            return self._fake().street_address()
        if 'street2' == action:
            return self._fake().street_name()
        if 'city' == action:
            return self._fake().city()
        if 'postcode' == action:
            return self._fake().postcode().split('-')[0]
        if 'url' == action:
            return self._fake().url()
        if 'job' == action:
            return self._fake().job()
        if 'email' == action:
            return self._fake().ascii_safe_email()
        if 'phone' == action:
            return self._fake().phone_number()
        if 'first_name' == action:
            return self._fake().first_name()
        if 'last_name' == action:
            return self._fake().last_name()
        if 'company' == action:
            return self._fake().company()
        if 'text' == action:
            return self._fake().text()
        if 'full_name' == action:
            return '%s %s' % (self._fake().first_name(), self._fake().first_name())

        return self._fake().sentence()
