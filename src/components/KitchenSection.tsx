import React, { useState } from 'react';
import { Recipe } from '../types';
import { soundFx } from '../utils/soundEffects';
import { Sticker } from './Sticker';
import {
  UtensilsCrossed,
  Heart,
  Star,
  Plus,
  Calendar,
  Clock,
  ExternalLink,
  ChefHat,
  X,
  Trash2,
  Edit3,
} from 'lucide-react';

interface KitchenSectionProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  onUpdateRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (id: string) => void;
  isEditMode: boolean;
}

export const KitchenSection: React.FC<KitchenSectionProps> = ({
  recipes,
  onAddRecipe,
  onUpdateRecipe,
  onDeleteRecipe,
  isEditMode,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [photosInput, setPhotosInput] = useState('');
  const [dateCooked, setDateCooked] = useState('');
  const [recipeUrl, setRecipeUrl] = useState('');
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [instructionsInput, setInstructionsInput] = useState('');
  const [cookTime, setCookTime] = useState('30 phút');
  const [difficulty, setDifficulty] = useState<'Dễ làm' | 'Vừa sức' | 'Cầu kỳ'>('Dễ làm');
  const [cookedBy, setCookedBy] = useState('Cả hai đứa cùng nấu');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [notes, setNotes] = useState('');

  // Stats
  const totalCooked = recipes.length;
  const avgRating = totalCooked > 0 ? (recipes.reduce((acc, r) => acc + r.rating, 0) / totalCooked).toFixed(1) : '5.0';
  const favoriteCount = recipes.filter((r) => r.favorite).length;

  const filteredRecipes = recipes.filter((r) => (onlyFavorites ? r.favorite : true));

  const handleToggleFavorite = (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    soundFx.playHeartChime();
    onUpdateRecipe({
      ...recipe,
      favorite: !recipe.favorite,
    });
    if (selectedRecipe?.id === recipe.id) {
      setSelectedRecipe({
        ...selectedRecipe,
        favorite: !selectedRecipe.favorite,
      });
    }
  };

  const openAddModal = () => {
    setName('');
    setPhotosInput('https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=800');
    setDateCooked(new Date().toISOString().split('T')[0]);
    setRecipeUrl('');
    setIngredientsInput('Mì Ý (200g)\nSốt cà chua\nBò bằm (200g)\nPhô mai');
    setInstructionsInput('Luộc mì 8 phút\nXào bò với sốt cà chua\nTrộn đều và rắc phô mai');
    setCookTime('30 phút');
    setDifficulty('Dễ làm');
    setCookedBy('Cả hai đứa cùng nấu');
    setRating(5);
    setReview('Món này ngon tuyệt cú mèo!');
    setNotes('');
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dateCooked) return;

    const photos = photosInput
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);
    const ingredients = ingredientsInput
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);
    const instructions = instructionsInput
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    onAddRecipe({
      name,
      photos: photos.length ? photos : ['https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=800'],
      dateCooked,
      recipeUrl: recipeUrl || undefined,
      ingredients,
      instructions,
      cookTime,
      difficulty,
      cookedBy,
      rating,
      review,
      notes,
      favorite: false,
    });

    soundFx.playCelebration();
    setIsAddModalOpen(false);
  };

  return (
    <section id="kitchen" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100/80 dark:bg-orange-950/60 text-orange-600 dark:text-orange-300 text-xs font-semibold mb-2">
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>Góc bếp yêu thương</span>
        </div>
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-600 dark:text-rose-400 font-bold mb-1">
          Our Little Kitchen
        </h2>
        <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 italic max-w-lg mx-auto">
          "What should we cook today?"
        </p>

        {/* Cooking History Stats Bar */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mt-6 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/50 border border-orange-200/60 dark:border-orange-900/40 shadow-sm">
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{totalCooked}</div>
            <div className="text-[11px] font-medium text-zinc-500">Món đã cùng nấu</div>
          </div>
          <div className="text-center border-x border-orange-100 dark:border-zinc-800">
            <div className="text-xl font-bold text-amber-500 flex items-center justify-center gap-1">
              <span>{avgRating}</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[11px] font-medium text-zinc-500">Đánh giá trung bình</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-rose-500 flex items-center justify-center gap-1">
              <span>{favoriteCount}</span>
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            <div className="text-[11px] font-medium text-zinc-500">Món ruột tâm đắc</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              onlyFavorites
                ? 'bg-rose-100 border-rose-300 text-rose-600'
                : 'border-pink-200 text-pink-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-500' : ''}`} />
            <span>Món yêu thích</span>
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm công thức món ăn</span>
          </button>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="polaroid-card group relative bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-orange-100 dark:border-zinc-800 shadow-md cursor-pointer flex flex-col justify-between"
          >
            {/* Scrap tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 tape-effect border-dashed border-t border-b border-orange-300 z-10" />

            <div>
              {/* Food Image */}
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-orange-50 mb-4">
                <img
                  src={recipe.photos[0]}
                  alt={recipe.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <button
                  onClick={(e) => handleToggleFavorite(e, recipe)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-rose-500 hover:scale-115 transition-transform"
                >
                  <Heart className={`w-4 h-4 ${recipe.favorite ? 'fill-rose-500' : ''}`} />
                </button>

                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs flex items-center gap-1 font-semibold">
                  <ChefHat className="w-3.5 h-3.5 text-orange-300" />
                  <span>{recipe.cookedBy}</span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 font-medium">
                  {recipe.difficulty} • {recipe.cookTime}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  {Array.from({ length: recipe.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                {recipe.name}
              </h3>

              <p className="font-handwriting text-xl text-pink-900/90 dark:text-pink-200/90 line-clamp-2 leading-relaxed mb-3">
                "{recipe.review}"
              </p>
            </div>

            {/* Bottom info */}
            <div className="flex items-center justify-between pt-3 border-t border-orange-50 dark:border-zinc-800 text-xs text-zinc-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Nấu ngày: {new Date(recipe.dateCooked).toLocaleDateString('vi-VN')}</span>
              </div>
              <span className="text-orange-500 font-semibold group-hover:translate-x-1 transition-transform">
                Xem công thức ➔
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-orange-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-orange-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Recipe photo banner */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-orange-50 mb-4">
              <img
                src={selectedRecipe.photos[0]}
                alt={selectedRecipe.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-sans font-bold text-2xl text-zinc-900 dark:text-zinc-100">
                {selectedRecipe.name}
              </h3>
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: selectedRecipe.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-4">
              <span className="px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 font-semibold">
                {selectedRecipe.difficulty}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                {selectedRecipe.cookTime}
              </span>
              <span className="flex items-center gap-1">
                <ChefHat className="w-3.5 h-3.5 text-orange-500" />
                {selectedRecipe.cookedBy}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                {new Date(selectedRecipe.dateCooked).toLocaleDateString('vi-VN')}
              </span>
            </div>

            {/* Ingredients */}
            <div className="mb-4 p-4 rounded-2xl bg-orange-50/60 dark:bg-zinc-800/60 border border-orange-100 dark:border-zinc-700">
              <h4 className="font-bold text-sm text-orange-900 dark:text-orange-300 mb-2">
                Nguyên liệu chuẩn bị:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="mb-4">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-2">
                Các bước thực hiện:
              </h4>
              <ol className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                {selectedRecipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Review & Notes */}
            <div className="p-4 rounded-2xl bg-pink-50/70 dark:bg-zinc-800/70 border border-pink-200/50 dark:border-zinc-700/50 mb-4">
              <div className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
                Cảm nhận của hai đứa:
              </div>
              <p className="font-handwriting text-2xl text-pink-950 dark:text-pink-100 leading-snug">
                "{selectedRecipe.review}"
              </p>
              {selectedRecipe.notes && (
                <p className="text-xs text-pink-600 dark:text-pink-400 mt-2 font-medium">
                  <strong>Mẹo nhỏ:</strong> {selectedRecipe.notes}
                </p>
              )}
            </div>

            {/* Open Recipe in new tab button */}
            <div className="flex items-center justify-between pt-2">
              {selectedRecipe.recipeUrl ? (
                <a
                  href={selectedRecipe.recipeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở hướng dẫn nấu ăn gốc (Open Recipe)</span>
                </a>
              ) : <div />}

              {isEditMode && (
                <button
                  onClick={() => {
                    onDeleteRecipe(selectedRecipe.id);
                    setSelectedRecipe(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa món ăn</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Recipe Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-orange-200 dark:border-zinc-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-orange-50 text-zinc-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-romantic text-3xl text-orange-600 dark:text-orange-400 font-bold mb-4">
              Thêm món ăn mới vào bếp 🍳
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Tên món ăn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bít tết sốt tiêu đen..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-orange-50/40 dark:bg-zinc-800/60 border border-orange-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Ngày nấu *
                  </label>
                  <input
                    type="date"
                    required
                    value={dateCooked}
                    onChange={(e) => setDateCooked(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-orange-50/40 dark:bg-zinc-800/60 border border-orange-200 dark:border-zinc-700 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Thời gian nấu
                  </label>
                  <input
                    type="text"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    placeholder="30 phút"
                    className="w-full px-3 py-2 rounded-xl bg-orange-50/40 dark:bg-zinc-800/60 border border-orange-200 dark:border-zinc-700 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Độ khó
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as 'Dễ làm')}
                    className="w-full px-3 py-2 rounded-xl bg-orange-50/40 dark:bg-zinc-800/60 border border-orange-200 dark:border-zinc-700 text-xs"
                  >
                    <option value="Dễ làm">Dễ làm</option>
                    <option value="Vừa sức">Vừa sức</option>
                    <option value="Cầu kỳ">Cầu kỳ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                    Người nấu
                  </label>
                  <input
                    type="text"
                    value={cookedBy}
                    onChange={(e) => setCookedBy(e.target.value)}
                    placeholder="Anh Gấu / Bé Mèo..."
                    className="w-full px-3 py-2 rounded-xl bg-orange-50/40 dark:bg-zinc-800/60 border border-orange-200 dark:border-zinc-700 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Nguyên liệu (mỗi món một dòng)
                </label>
                <textarea
                  rows={2}
                  value={ingredientsInput}
                  onChange={(e) => setIngredientsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-orange-50/40 dark:bg-zinc-800/60 border border-orange-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Cách nấu (mỗi bước một dòng)
                </label>
                <textarea
                  rows={2}
                  value={instructionsInput}
                  onChange={(e) => setInstructionsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-orange-50/40 dark:bg-zinc-800/60 border border-orange-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Cảm nhận & Đánh giá (Review)
                </label>
                <textarea
                  rows={2}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Món này thơm ngon, em ăn hết sạch..."
                  className="w-full px-3 py-2 rounded-xl bg-orange-50/40 dark:bg-zinc-800/60 border border-orange-200 dark:border-zinc-700 text-xs font-handwriting text-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-1">
                  Link ảnh món ăn
                </label>
                <input
                  type="text"
                  value={photosInput}
                  onChange={(e) => setPhotosInput(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-orange-50/40 dark:bg-zinc-800/60 border border-orange-200 dark:border-zinc-700 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-1.5 rounded-full text-xs text-zinc-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-orange-500 text-white text-xs font-bold"
                >
                  Lưu vào bếp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
