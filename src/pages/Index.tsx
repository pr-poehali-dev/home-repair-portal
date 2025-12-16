import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const services = [
  {
    id: 1,
    title: "Косметический ремонт",
    description: "Обои, покраска, мелкие работы",
    price: "от 2500₽/м²",
    icon: "PaintBucket",
    features: ["Поклейка обоев", "Покраска стен", "Мелкий ремонт"]
  },
  {
    id: 2,
    title: "Капитальный ремонт",
    description: "Полная перепланировка и отделка",
    price: "от 8000₽/м²",
    icon: "Hammer",
    features: ["Демонтаж", "Перепланировка", "Полная отделка"]
  },
  {
    id: 3,
    title: "Ремонт ванной",
    description: "Сантехника, плитка, гидроизоляция",
    price: "от 5500₽/м²",
    icon: "Droplets",
    features: ["Укладка плитки", "Установка сантехники", "Гидроизоляция"]
  },
  {
    id: 4,
    title: "Электрика",
    description: "Монтаж проводки и освещения",
    price: "от 1200₽/точка",
    icon: "Zap",
    features: ["Замена проводки", "Установка розеток", "Монтаж освещения"]
  },
  {
    id: 5,
    title: "Сантехнические работы",
    description: "Установка и замена оборудования",
    price: "от 3000₽",
    icon: "Wrench",
    features: ["Замена труб", "Установка сантехники", "Ремонт систем"]
  },
  {
    id: 6,
    title: "Напольные покрытия",
    description: "Ламинат, паркет, плитка",
    price: "от 800₽/м²",
    icon: "Grid3x3",
    features: ["Ламинат", "Паркетная доска", "Керамогранит"]
  }
];

const reviews = [
  {
    name: "Анна Петрова",
    rating: 5,
    text: "Сделали капитальный ремонт квартиры за 2 месяца. Качество отличное, все точно в срок!",
    date: "15 ноября 2024"
  },
  {
    name: "Дмитрий Соколов",
    rating: 5,
    text: "Ребята профессионалы своего дела. Ремонт ванной комнаты выполнен безупречно.",
    date: "28 октября 2024"
  },
  {
    name: "Елена Морозова",
    rating: 5,
    text: "Быстро, качественно, недорого. Косметический ремонт сделали за неделю. Рекомендую!",
    date: "3 ноября 2024"
  }
];

const timeSlots = ["09:00", "11:00", "13:00", "15:00", "17:00"];

export default function Index() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime || !name || !phone) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setIsBookingOpen(false);
    setSelectedService("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setName("");
    setPhone("");
    setComment("");
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Home" className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-accent">РемонтПро</span>
            </div>
            <div className="flex items-center gap-2">
              <a href="#services" className="px-4 py-2 text-sm font-semibold hover:bg-muted rounded-lg transition-colors">Услуги</a>
              <a href="#about" className="px-4 py-2 text-sm font-semibold hover:bg-muted rounded-lg transition-colors">О нас</a>
              <a href="#reviews" className="px-4 py-2 text-sm font-semibold hover:bg-muted rounded-lg transition-colors">Отзывы</a>
              <a href="#contacts" className="px-4 py-2 text-sm font-semibold hover:bg-muted rounded-lg transition-colors">Контакты</a>
            </div>
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="font-semibold">
                  <Icon name="Calendar" className="mr-2" size={18} />
                  Записаться
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Запись на услугу</DialogTitle>
                  <DialogDescription>Выберите услугу, дату и время для консультации</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label>Услуга *</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.title}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Дата визита *</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Время *</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ваше имя *</Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван Иванов" />
                    </div>
                    <div className="space-y-2">
                      <Label>Телефон *</Label>
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (999) 123-45-67" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Комментарий</Label>
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Опишите задачу или задайте вопрос..."
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleBooking} className="w-full" size="lg">
                    Отправить заявку
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-accent via-accent/95 to-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
            Творческий подход к каждому проекту
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Ремонт, который <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              вдохновляет
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Превращаем ваше пространство в произведение искусства. Профессиональный ремонт с гарантией качества и креативным подходом.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Записаться на консультацию
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Icon name="Phone" className="mr-2" size={20} />
              +7 (999) 123-45-67
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-white/70 text-sm">Завершенных проектов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <div className="text-white/70 text-sm">Лет опыта</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-white/70 text-sm">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Наши услуги</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что мы предлагаем</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Полный спектр услуг по ремонту и отделке помещений любой сложности
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={service.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 group">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={service.icon as any} className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-primary">{service.price}</div>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Icon name="CheckCircle2" size={16} className="text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-4" variant="outline" onClick={() => setSelectedService(service.title)}>
                          Заказать услугу
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="outline">О компании</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Мы создаем пространства мечты</h2>
              <p className="text-lg text-muted-foreground mb-6">
                РемонтПро — это команда профессионалов с 12-летним опытом в сфере ремонта и отделки. 
                Мы не просто выполняем работы, мы воплощаем ваши идеи в реальность, добавляя творческий подход и внимание к деталям.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Гарантия качества</h3>
                    <p className="text-muted-foreground">Предоставляем гарантию на все виды работ до 3 лет</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Соблюдение сроков</h3>
                    <p className="text-muted-foreground">Работаем строго по договору, без задержек</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Users" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Опытная команда</h3>
                    <p className="text-muted-foreground">Сертифицированные мастера с многолетним стажем</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="Building2" size={200} className="text-primary/30" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary to-secondary rounded-3xl opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Отзывы клиентов</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что говорят наши клиенты</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Нам доверяют сотни довольных клиентов по всей России
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" className="text-white" size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <div className="flex gap-1 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-primary fill-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">{review.text}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Контакты</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Готовы обсудить ваш проект? Оставьте заявку или позвоните нам прямо сейчас
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Оставьте заявку</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Имя</Label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div className="space-y-2">
                  <Label>Телефон</Label>
                  <Input placeholder="+7 (999) 123-45-67" />
                </div>
                <div className="space-y-2">
                  <Label>Сообщение</Label>
                  <Textarea placeholder="Расскажите о вашем проекте..." rows={4} />
                </div>
                <Button className="w-full" size="lg" onClick={() => toast.success("Заявка отправлена!")}>
                  Отправить заявку
                </Button>
              </div>
            </Card>
            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Телефон</h4>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                    <p className="text-muted-foreground">+7 (999) 765-43-21</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                    <p className="text-muted-foreground">info@remontpro.ru</p>
                    <p className="text-muted-foreground">zakaz@remontpro.ru</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Адрес</h4>
                    <p className="text-muted-foreground">г. Москва, ул. Строителей, д. 15</p>
                    <p className="text-sm text-muted-foreground mt-1">Пн-Пт: 9:00 - 19:00, Сб-Вс: 10:00 - 16:00</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-accent text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Home" className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold">РемонтПро</span>
              </div>
              <p className="text-white/70 text-sm">
                Профессиональный ремонт с творческим подходом. Превращаем ваши идеи в реальность.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Косметический ремонт</li>
                <li>Капитальный ремонт</li>
                <li>Ремонт ванной</li>
                <li>Электрика</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>О нас</li>
                <li>Портфолио</li>
                <li>Отзывы</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>+7 (999) 123-45-67</li>
                <li>info@remontpro.ru</li>
                <li>г. Москва, ул. Строителей, 15</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
            © 2024 РемонтПро. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}